import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit{

  ngOnInit(): void {}

  correo: string = '';
  contraseña: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.correo, this.contraseña).subscribe(
      response => {
        if (response.success) {
          // Redirige a la página de inicio u otra ruta protegida
          this.router.navigate(['']);
        } else {
          // Maneja el error de inicio de sesión
          alert('Correo o contraseña incorrectos');
        }
      },
      error => {
        // Maneja los errores de inicio de sesión
        console.error('Error de inicio de sesión', error);
      }
    );
  }

}
