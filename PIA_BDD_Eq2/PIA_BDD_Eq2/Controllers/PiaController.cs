using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PIA_BDD_Eq2.Data;
using PIA_BDD_Eq2.Models;


namespace PIA_BDD_Eq2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiaController : ControllerBase
    {
        private readonly EventoData _eventoData;

        public PiaController(EventoData eventoData)
        {
            _eventoData = eventoData;
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<Evento> Lista = await _eventoData.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpPost("Crear")]
        public async Task<IActionResult> Crear([FromBody] Evento objeto)
        {
            bool respuesta = await _eventoData.Crear(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPost("CrearUsrReg")]
        public async Task<IActionResult> CrearUsrReg([FromBody] UsuarioConRegistro objeto)
        {
            bool respuesta = await _eventoData.CrearUsrReg(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPost("CrearAsistRegistEventBol")]
        public async Task<IActionResult> CrearAsistRegistEventBol([FromBody] AsisRegEventBol objeto)
        {
            bool respuesta = await _eventoData.CrearAsistRegistEventBol(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Evento objeto)
        {
            bool respuesta = await _eventoData.Editar(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _eventoData.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }
    }
}
