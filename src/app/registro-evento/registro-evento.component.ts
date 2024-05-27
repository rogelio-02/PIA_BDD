import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrl: './registro-evento.component.css'
})
export class RegistroEventoComponent implements OnInit{
  nombreEvento: string | undefined;
  registroForm: FormGroup;
  mostrarSeccionMatricula: boolean = false;
  mostrarMensaje: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventosService: EventosService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      matricula: [''],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Obtener el nombre del evento de los parámetros de la ruta
      this.nombreEvento = 'Nombre del Evento'; // Reemplazar con la lógica para obtener el nombre del evento
    });

    // Escuchar cambios en el campo de correo para determinar si mostrar la sección extra de matrícula
    if (this.registroForm) {
      this.registroForm.get('correo')?.valueChanges.subscribe(correo => {
        this.mostrarSeccionMatricula = this.validarCorreoRegistrado(correo);
      });
    }
  }

  validarCorreoRegistrado(correo: string): boolean {
    // Lógica para determinar si el correo coincide con un usuario registrado
    // Retorna verdadero si el correo coincide, falso de lo contrario
    return true; // Reemplazar con la lógica real
  }

  registrar(): void {
    if (this.registroForm.valid) {
      // Lógica para registrar al usuario al evento
      this.mostrarMensaje = true;
      console.log('Formulario válido, registrando usuario...');
    } else {
      // Manejar caso en que el formulario no es válido
      console.log('Formulario no válido, no se puede registrar.');
    }
  }
}
