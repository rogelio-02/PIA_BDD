import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Evento } hay q importar el modelo
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-carta-evento',
  templateUrl: './carta-evento.component.html',
  styleUrl: './carta-evento.component.css'
})
export class CartaEventoComponent {
  eventoId: number | undefined;
  evento: any; // Asegúrate de importar el modelo de evento si lo tienes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Obtener el ID del evento de los parámetros de la ruta
      this.eventoId = +params['id'];

      // Obtener los detalles del evento usando el servicio de eventos
      this.eventosService.getEvento(this.eventoId).subscribe((evento: any) => {
        this.evento = evento;
      });
    });
  }

  registrarse(): void {
    // Navegar al componente de registro de evento y pasar el ID del evento
    this.router.navigate(['/registro-evento', this.eventoId]);
  }
}
