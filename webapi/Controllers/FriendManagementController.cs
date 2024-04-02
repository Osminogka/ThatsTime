using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using webapi.Models;

namespace webapi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/friends")]
    public class FriendManagementController : Controller
    {
        DataContext DataContext;

        public FriendManagementController(DataContext ctx)
        {
            DataContext = ctx;
        }


        [HttpGet("sendinvite")]
        public async Task<IActionResult> SendFrienInviteToUserAsync([FromQuery]string FriendName)
        {
            FriendResponse response = new FriendResponse();

            try
            {

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Server error!");
            }

            return Ok(response);
        }

        [HttpGet("deletefriend")]
        public async Task<IActionResult> DeleteFriendAsync([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();

            return Ok(response);
        }

        [HttpGet("acceptinvite")]
        public async Task<IActionResult> AcceptFriendInvite([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();

            return Ok(response);
        }

        [HttpGet("declineinvite")]
        public async Task<IActionResult> DeclineFriendInvite([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();

            return Ok(response);
        }

        private string getUserName()
        {
            return HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
        }
    }

    public class FriendResponse
    {
        public bool Success { get; set; } = false;

        public string Message { get; set; } = "Request has failed";
    }
}
