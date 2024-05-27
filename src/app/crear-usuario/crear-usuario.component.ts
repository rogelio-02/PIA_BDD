import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventosService } from '../services/eventos.service';
import { UsuarioConRegistro } from '../model/usuario.model';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit{
  registerForm: FormGroup;
  dependencias: string[] = ['Ciencias', 'Artes', 'Deportes'];
  roles: string[] = ['Administrador general', 'Administrador dependencia', 'Cliente', 'Operador'];
  usuarios: UsuarioConRegistro[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private eventosService: EventosService
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
    this.eventosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  crearUsuario(usuario: UsuarioConRegistro) {
    this.eventosService.crearUsuario(usuario).subscribe(response => {
      this.usuarios.push(usuario);
    });
  }

  editarUsuario(usuario: UsuarioConRegistro) {
    this.eventosService.editarUsuario(usuario.rol_ID, usuario).subscribe(response => {
      const index = this.usuarios.findIndex(u => u.rol_ID === usuario.rol_ID);
      if (index !== -1) {
        this.usuarios[index] = usuario;
      }
    });
  }

  eliminarUsuario(id: number) {
    this.eventosService.eliminarUsuario(id).subscribe(response => {
      this.usuarios = this.usuarios.filter(usuario => usuario.rol_ID !== id);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const usuario = this.registerForm.value;

      console.log('Usuario registrado:', usuario);

    }
  }

  isAdminGeneral(): boolean {
    return this.authService.getUserRole() === 'Administrador general';
  }
}
