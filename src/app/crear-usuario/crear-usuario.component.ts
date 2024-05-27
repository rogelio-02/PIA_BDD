import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit{
  registerForm: FormGroup;
  dependencias: string[] = ['Ciencias', 'Artes', 'Deportes'];
  roles: string[] = ['Administrador general', 'Administrador dependencia', 'Cliente', 'Operador'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dependencia: ['', Validators.required],
      rol: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (!this.isAdminGeneral()) {
      this.router.navigate(['']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const usuario = this.registerForm.value;
      // Aquí debes implementar la lógica para registrar el usuario con tu servicio
      console.log('Usuario registrado:', usuario);

      // Redirigir al usuario a la página de inicio de sesión después del registro
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  isAdminGeneral(): boolean {
    return this.authService.getUserRole() === 'Administrador general';
  }
}
