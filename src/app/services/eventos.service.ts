import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento.model';
import { UsuarioConRegistro } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:5000/api/eventos';
  private userApiUrl = 'http://localhost:5000/api/usuarios';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  crearEvento(evento: Evento): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  editarEvento(id: number, evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  eliminarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Métodos para UsuarioConRegistro
  getUsuarios(): Observable<UsuarioConRegistro[]> {
    return this.http.get<UsuarioConRegistro[]>(this.userApiUrl);
  }

  crearUsuario(usuario: UsuarioConRegistro): Observable<any> {
    return this.http.post(this.userApiUrl, usuario);
  }

  editarUsuario(id: number, usuario: UsuarioConRegistro): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/${id}`);
  }

  buscarEventos(filtros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buscar`, filtros);
  }
}
