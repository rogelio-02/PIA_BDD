import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from '../services/eventos.service';
import { AsisRegEventBol } from '../model/registro-evento.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
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

  ngOnInit(): void {}

  registrar(): void {
    if (this.registroForm.valid) {
      this.mostrarMensaje = true;
      console.log('Formulario válido, registrando usuario...');
    } else {
      console.log('Formulario no válido, no se puede registrar.');
    }
  }

  asistente: AsisRegEventBol = {
    nombreAsistente: '',
    apellidoPaternoAsistente: '',
    apellidoMaternoAsistente: '',
    correoAsistente: '',
    tipoAsistente: '',
    semestre: 0,
    telefono: 0,
    matricula: 0,
    evento_ID: 0,
    fecha_Registro: '',
    estadoPago: '',
    asiento: ''
  };

  onSubmit(): void {
    this.authService.registrarAsistente(this.asistente).subscribe(
      response => {
        if (response.success) {
          // Navegar a otra página después del registro exitoso
          this.router.navigate(['']);
        } else {
          alert('Error al registrar asistente');
        }
      },
      error => {
        console.error('Error al registrar asistente', error);
      }
    );
  }
}
