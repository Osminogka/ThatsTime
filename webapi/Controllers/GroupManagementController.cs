using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using webapi.Models;

namespace webapi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/groups")]
    public class GroupManagementController : Controller
    {
        DataContext DataContext;

        public GroupManagementController(DataContext ctx)
        {
            DataContext = ctx;
        }

        [HttpPost("create")]
        public async Task<IActionResult> createGroupAsync([FromBody] string groupname)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response);
        }

        [HttpGet("enter")]
        public async Task<IActionResult> enterGroupAsync([FromQuery] string groupname)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response); 
        }

        [HttpGet("sendinvite")]
        public async Task<IActionResult> sendInviteToGroupAsync([FromQuery] GroupRequest request)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response);
        }

        [HttpGet("acceptinvite")]
        public async Task<IActionResult> acceptInviteToGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response);
        }

        [HttpGet("declineinvite")]
        public async Task<IActionResult> declineInviteToGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response);
        }

        [HttpGet("leave")]
        public async Task<IActionResult> leaveGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            return Ok(response);
        }

        private string getUserName()
        {
            return HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
        }
    }

    public class GroupResponse
    {
        public bool Success { get; set; } = false;

        public string Message { get; set; } = "Request has failed";
    }

    public class GroupRequest
    {
        public string FriendName { get; set; }

        public string GroupName { get; set; }
    }
}
