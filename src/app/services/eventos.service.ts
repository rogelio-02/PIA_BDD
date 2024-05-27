import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://api.tuservidor.com/eventos';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEvento(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  buscarEventos(filtros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buscar`, filtros);
  }

  crearEvento(evento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, evento);
  }

  eliminarEvento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
