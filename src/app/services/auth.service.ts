import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsisRegEventBol } from '../model/registro-evento.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth'; // URL del endpoint de autenticación

  private user = {
    role: 'Administrador general',
    dependencia: ''
  };

  constructor(private http: HttpClient) { }

  login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contraseña });
  }

  private apiUrll = 'http://localhost:5000/api/asistente'; // URL del endpoint de registro

  registrarAsistente(asistente: AsisRegEventBol): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, asistente);
  }

  getUserRole(): string {
    return this.user.role;
  }

  getUserDependencia(): string {
    return this.user.dependencia;
  }
}
