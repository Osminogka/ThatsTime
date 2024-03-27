using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecordsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> getRecords(){
            return Ok();
        }
    }
}
