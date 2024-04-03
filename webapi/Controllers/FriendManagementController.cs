using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using webapi.Models;

namespace webapi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/friends")]
    public class FriendManagementController : MyBaseController
    {
        DataContext DataContext;

        public FriendManagementController(DataContext ctx)
        {
            DataContext = ctx;
        }

        [HttpGet("get")]
        public async Task<IActionResult> getFriendListAsync()
        {
            FriendResponse response = new FriendResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                List<string> friendList = await DataContext.FriendsLists
                    .Where(obj => obj.FirstUserId == mainUser.UserId || obj.SecondUserId == mainUser.UserId)
                    .Select(obj => obj.FirstUserId == mainUser.UserId ? obj.FirstUserInfo.UserName : obj.SecondUserInfo.UserName).ToListAsync();

                response.FriendList = friendList;
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Request has succeeded";

            return Ok(response);
        }

        [HttpGet("sendinvite")]
        public async Task<IActionResult> SendFrienInviteToUserAsync([FromQuery]string FriendName)
        {
            FriendResponse response = new FriendResponse();

            try
            {
                FriendsInfo friendsInfo = await areFriends(FriendName);
                if(friendsInfo.AreFriends)
                    return Ok(response);

                FriendInvites friendInvite = new FriendInvites()
                {
                    SenderUserId = friendsInfo.MainUserId,
                    TargetUserId = friendsInfo.FriendUserId
                };

                await DataContext.FriendInvites.AddAsync(friendInvite);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Request has succeeded";

            return Ok(response);
        }

        [HttpGet("deletefriend")]
        public async Task<IActionResult> DeleteFriendAsync([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();
            try
            {
                FriendsInfo friendsInfo = await areFriends(FriendName);
                if (!friendsInfo.AreFriends)
                    return Ok(response);

                long firstUserId = Math.Max(friendsInfo.MainUserId, friendsInfo.FriendUserId);
                long secondUserId = Math.Min(friendsInfo.MainUserId, friendsInfo.FriendUserId);

                FriendsList friendsList = new FriendsList
                {
                    FirstUserId = firstUserId,
                    SecondUserId = secondUserId
                };

                DataContext.FriendsLists.Remove(friendsList);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Request has succeeded";

            return Ok(response);
        }

        [HttpGet("acceptinvite")]
        public async Task<IActionResult> AcceptFriendInvite([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();
            try
            {
                UserInfo mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(user => user.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                UserInfo friendUser = await DataContext.UserInfo.SingleOrDefaultAsync(user => user.UserName == FriendName);
                if (friendUser == null)
                    return Ok(response);

                FriendInvites friendInvite = new FriendInvites()
                {
                    SenderUserId = friendUser.UserId,
                    TargetUserId = mainUser.UserId
                };

                long firstUserId = Math.Max(friendUser.UserId, mainUser.UserId);
                long secondUserId = Math.Min(friendUser.UserId, mainUser.UserId);

                FriendsList friendsList = new FriendsList()
                {
                    FirstUserId = firstUserId,
                    SecondUserId = secondUserId
                };

                DataContext.FriendInvites.Remove(friendInvite);
                await DataContext.FriendsLists.AddAsync(friendsList);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Request has succeeded";

            return Ok(response);
        }

        [HttpGet("declineinvite")]
        public async Task<IActionResult> DeclineFriendInvite([FromQuery] string FriendName)
        {
            FriendResponse response = new FriendResponse();
            try
            {
                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                UserInfo? friendUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == FriendName);
                if (friendUser == null)
                    return Ok(response);

                FriendInvites? friendInviteCheck = await DataContext.FriendInvites.SingleOrDefaultAsync(obj => obj.TargetUserId == mainUser.UserId && obj.SenderUserId == friendUser.UserId);
                if (friendInviteCheck == null)
                    return Ok(response);

                FriendInvites friendInvite = new FriendInvites()
                {
                    SenderUserId = friendUser.UserId,
                    TargetUserId = mainUser.UserId
                };

                DataContext.FriendInvites.Remove(friendInvite);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Request has succeeded";

            return Ok(response);
        }

        private async Task<FriendsInfo> areFriends(string friendName)
        {
            FriendsInfo friendsInfo = new FriendsInfo();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return friendsInfo;

                UserInfo? friendUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == friendName);
                if (friendName == null)
                    return friendsInfo;

                long firstUserId = Math.Max(mainUser.UserId, friendUser.UserId);
                long secondUserId = Math.Min(mainUser.UserId, friendUser.UserId);

                FriendsList? areFriends = await DataContext.FriendsLists.SingleOrDefaultAsync(obj => obj.FirstUserId == firstUserId && obj.SecondUserId == secondUserId);
                if (areFriends == null)
                    return friendsInfo;

                friendsInfo.AreFriends = true;
                friendsInfo.FriendUserId = friendUser.UserId;
                friendsInfo.MainUserId = mainUser.UserId;

                return friendsInfo;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return friendsInfo;
            }
        }

        private class FriendsInfo
        {
            public bool AreFriends { get; set; } = false;

            public long MainUserId { get; set; }

            public long FriendUserId { get; set; }
        }
    }


    public class FriendResponse
    {
        public bool Success { get; set; } = false;

        public string Message { get; set; } = "Request has failed";

        public List<string> FriendList { get; set; } = new List<string>();
    }
}
