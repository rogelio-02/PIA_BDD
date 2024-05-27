using PIA_BDD_Eq2.Models;
using System.Data;
using System.Data.SqlClient;

namespace PIA_BDD_Eq2.Data
{
    public class EventoData
    {
        private readonly string conexion;

        public EventoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<List<Evento>> Lista()
        {
            List<Evento> lista = new List<Evento>();

            using (var conn = new SqlConnection(conexion))
            {
                await conn.OpenAsync();
                SqlCommand cmd = new SqlCommand("MostrarEvento", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Evento
                        {
                            Evento_ID = Convert.ToInt32(reader["Evento_ID"]),
                            Lugar_ID = Convert.ToInt32(reader["Lugar_ID"]),
                            Usuario_ID = Convert.ToInt32(reader["Usuario_ID"]),
                            Descripcion = reader["Descripcion"].ToString(),
                            Nombre = reader["Nombre"].ToString(),
                            Fecha = reader["Fecha"].ToString(),
                            Hora = (TimeSpan)reader["Hora"],
                            Costo = Convert.ToDecimal(reader["Costo"]),
                            Publicado = Convert.ToInt32(reader["Publicado"]),
                            Categoria = reader["Categoria"].ToString(),

                        });
                    }
                }
            }
            return lista;
        }

        public async Task<bool> Crear(Evento objeto)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("CrearEvento", conn);
                cmd.Parameters.AddWithValue("@Lugar_ID", objeto.Lugar_ID);
                cmd.Parameters.AddWithValue("@Usuario_ID", objeto.Usuario_ID);
                cmd.Parameters.AddWithValue("@Descripcion", objeto.Descripcion);
                cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                cmd.Parameters.AddWithValue("@Fecha", objeto.Fecha);
                cmd.Parameters.AddWithValue("@Hora", objeto.Hora);
                cmd.Parameters.AddWithValue("@Costo", objeto.Costo);
                cmd.Parameters.AddWithValue("@Publicado", objeto.Publicado);
                cmd.Parameters.AddWithValue("@Categoria", objeto.Categoria);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Editar(Evento objeto)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("EditarEvento", conn);
                cmd.Parameters.AddWithValue("@Evento_ID", objeto.Evento_ID);
                cmd.Parameters.AddWithValue("@Lugar_ID", objeto.Lugar_ID);
                cmd.Parameters.AddWithValue("@Usuario_ID", objeto.Usuario_ID);
                cmd.Parameters.AddWithValue("@Descripcion", objeto.Descripcion);
                cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                cmd.Parameters.AddWithValue("@Fecha", objeto.Fecha);
                cmd.Parameters.AddWithValue("@Hora", objeto.Hora);
                cmd.Parameters.AddWithValue("@Costo", objeto.Costo);
                cmd.Parameters.AddWithValue("@Publicado", objeto.Publicado);
                cmd.Parameters.AddWithValue("@Categoria", objeto.Categoria);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Eliminar(int id)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("EliminarEvento", conn);
                cmd.Parameters.AddWithValue("@Evento_ID", id);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }


        public async Task<bool> CrearUsrReg(UsuarioConRegistro objeto)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("CrearUsuarioConRegistro", conn);
                cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                cmd.Parameters.AddWithValue("@ApellidoPaterno", objeto.ApellidoPaterno);
                cmd.Parameters.AddWithValue("@ApellidoMaterno", objeto.ApellidoMaterno);
                cmd.Parameters.AddWithValue("@Rol_ID", objeto.Rol_ID);
                cmd.Parameters.AddWithValue("@Dependencia_ID", objeto.Dependencia_ID);
                cmd.Parameters.AddWithValue("@Vigencia", objeto.Vigencia);
                cmd.Parameters.AddWithValue("@Correo", objeto.Correo);
                cmd.Parameters.AddWithValue("@Contraseña", objeto.Contraseña);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> CrearAsistRegistEventBol(AsisRegEventBol objeto)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("CrearAsistenteRegistroEventoBoleto", conn);
                cmd.Parameters.AddWithValue("@NombreAsistente", objeto.NombreAsistente);
                cmd.Parameters.AddWithValue("@ApellidoPaternoAsistente", objeto.ApellidoPaternoAsistente);
                cmd.Parameters.AddWithValue("@ApellidoMaternoAsistente", objeto.ApellidoMaternoAsistente);
                cmd.Parameters.AddWithValue("@CorreoAsistente", objeto.CorreoAsistente);
                cmd.Parameters.AddWithValue("@TipoAsistente", objeto.TipoAsistente);
                cmd.Parameters.AddWithValue("@Semestre", objeto.Semestre);
                cmd.Parameters.AddWithValue("@Telefono", objeto.Telefono);
                cmd.Parameters.AddWithValue("@Matricula", objeto.Matricula);
                cmd.Parameters.AddWithValue("@Evento_ID", objeto.Evento_ID);
                cmd.Parameters.AddWithValue("@Fecha_Registro", objeto.Fecha_Registro);
                cmd.Parameters.AddWithValue("@EstadoPago", objeto.EstadoPago);
                cmd.Parameters.AddWithValue("@Asiento", objeto.Asiento);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

    }
}
