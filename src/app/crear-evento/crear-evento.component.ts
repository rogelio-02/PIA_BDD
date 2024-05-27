import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent implements OnInit{
  eventoForm: FormGroup;
  categorias: string[] = ['Conferencia', 'Taller', 'Seminario'];

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      costo: [''],
      categoria: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  crearEvento(): void {
    if (this.eventoForm.valid) {
      const evento = this.eventoForm.value;
      // Aquí puedes agregar lógica para manejar el costo del evento si es necesario
      this.eventosService.crearEvento(evento).subscribe((response) => {
        console.log('Evento creado:', response);
        // Redireccionar al usuario de vuelta al home después de crear el evento
        this.router.navigate(['']);
      });
    }
  }
}
