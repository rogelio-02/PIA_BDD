namespace PIA_BDD_Eq2.Models
{
    public class UsuarioConRegistro
    {
        public string? Nombre { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public int Rol_ID { get; set; }
        public int Dependencia_ID { get; set; }
        public string? Vigencia { get; set; }
        public string? Correo { get; set; }
        public string? Contraseña { get; set; }
    }
}
