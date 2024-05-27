namespace PIA_BDD_Eq2.Models
{
    public class Evento
    {
        public int Evento_ID { get; set; }
        public int Lugar_ID { get; set; }
        public int Usuario_ID { get; set; }
        public string? Descripcion { get; set; }
        public string? Nombre { get; set; }
        public string? Fecha { get; set; }
        public TimeSpan Hora { get; set; }
        public decimal Costo { get; set; }
        public int Publicado { get; set; }
        public string? Categoria { get; set; }

    }
}
