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
        public async Task<IActionResult> postRecordAsync()
        {
            return Ok();
        }

        [HttpGet("certain")]
        public async Task<IActionResult> getCertainRecordAsync(){
            return Ok();
        }

        [HttpGet("friend")]
        public async Task<IActionResult> getRecordsWithFriendAsync()
        {
            return Ok();
        }

        [HttpGet("group")]
        public async Task<IActionResult> getRecordsWithGroupAsync()
        {
            return Ok();
        }

        [HttpGet("recent")]
        public async Task<IActionResult> getRecentRecordsAsyncAsync()
        {
            return Ok();
        }
    }
}
