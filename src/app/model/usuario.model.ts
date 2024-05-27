export interface UsuarioConRegistro {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  rol_ID: number;
  dependencia_ID: number;
  vigencia?: string;
  correo?: string;
  contraseña?: string;
}
