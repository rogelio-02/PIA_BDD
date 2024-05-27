export interface Evento {
  evento_ID: number;
  lugar_ID: number;
  usuario_ID: number;
  descripcion?: string;
  nombre?: string;
  fecha?: string;
  hora: string;
  costo: number;
  publicado: number;
  categoria?: string;
}
