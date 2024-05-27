import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  categorias: string[] = ['Conferencia', 'Taller', 'Seminario'];
  dependencias: string[] = ['Ciencias', 'Artes', 'Deportes'];
  eventos: any[] = [];  // Aquí puedes definir el tipo de eventos si tienes una interfaz

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
    this.eventosService.getEventos().subscribe((data: any[]) => {
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
    this.router.navigate([`/eventos/${id}`]);
  }

  editarEvento(id: number): void {
    this.router.navigate([`/eventos/editar/${id}`]);
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

  eliminarEvento(id: number): void {
    this.eventosService.eliminarEvento(id).subscribe(() => {
      // Eliminar el evento de la lista actual
      this.eventos = this.eventos.filter(evento => evento.id !== id);
    });
  }

}
