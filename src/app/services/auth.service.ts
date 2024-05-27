import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {
    role: 'Administrador general', // Este es un ejemplo, deberías obtener esta información de tu sistema de autenticación
    dependencia: 'Ciencias' // Ejemplo, la dependencia del usuario autenticado
  };

  constructor() { }

  getUserRole(): string {
    return this.user.role;
  }

  getUserDependencia(): string {
    return this.user.dependencia;
  }

  // Aquí puedes agregar métodos para autenticar y manejar el usuario
}
