import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { AuthService } from '../services/auth.service';
import { Evento } from '../model/evento.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  categorias: string[] = ['Conferencia', 'Taller', 'Seminario'];
  dependencias: string[] = ['Ciencias', 'Artes', 'Deportes'];
  eventos: Evento[] = [];

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      nombre: [''],
      categoria: [''],
      dependencia: ['']
    });
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventosService.getEventos().subscribe(data => {
      this.eventos = data;
    });
  }

  onSearch(): void {
    const filtros = this.searchForm.value;
    this.eventosService.buscarEventos(filtros).subscribe((data: any[]) => {
      this.eventos = data;
    });
  }

  onReset(): void {
    this.searchForm.reset();
    this.cargarEventos();
  }

  verDetalle(id: number): void {
    this.router.navigate([`/carta-evento/${id}`]);
  }

  editarEvento(evento: Evento) {
    this.eventosService.editarEvento(evento.evento_ID, evento).subscribe(response => {
      const index = this.eventos.findIndex(e => e.evento_ID === evento.evento_ID);
      if (index !== -1) {
        this.eventos[index] = evento;
      }
    });
  }

  isAdminGeneral(): boolean {
    return this.authService.getUserRole() === 'Administrador general';
  }

  isAdminDependencia(): boolean {
    return this.authService.getUserRole() === 'Administrador dependencia';
  }

  canCreateEvent(): boolean {
    const role = this.authService.getUserRole();
    const dependencia = this.authService.getUserDependencia();
    return role === 'Administrador general' || (role === 'Administrador dependencia' && this.dependencias.includes(dependencia));
  }

  canEditEvent(evento: any): boolean {
    const role = this.authService.getUserRole();
    const dependencia = this.authService.getUserDependencia();
    return role === 'Administrador general' || (role === 'Administrador dependencia' && evento.dependencia === dependencia);
  }

  eliminarEvento(id: number) {
    this.eventosService.eliminarEvento(id).subscribe(response => {
      this.eventos = this.eventos.filter(evento => evento.evento_ID !== id);
    });
  }

}
