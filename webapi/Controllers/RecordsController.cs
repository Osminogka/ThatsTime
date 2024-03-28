using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace webapi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/records")]
    public class RecordsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> getRecords(){
            return Ok();
        }
    }
}
