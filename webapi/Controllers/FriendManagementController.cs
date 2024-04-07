using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("getusers")]
        public async Task<IActionResult> getUsers([FromQuery] int page)
        {
            List<string> users = new List<string>();
            FriendResponse response = new FriendResponse();
            const int pageSize = 10;
            try
            {
                string mainUsername = getUserName();

                users = await DataContext.UserInfo
                    .Where(obj => (obj.UserName != mainUsername) && 
                        obj.FirstFromFriendList.Where(friend => friend.FirstUserInfo.UserName != mainUsername || friend.SecondUserInfo.UserName != mainUsername).Count() == 0 &&
                        obj.SecondFromFriendList.Where(friend => friend.FirstUserInfo.UserName != mainUsername || friend.SecondUserInfo.UserName != mainUsername).Count() == 0)
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Select(obj => obj.UserName)
                    .ToListAsync();
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.FriendList = users;
            response.Message = "Request has succeeded";
            return Ok(response);
        }

        [HttpGet("getfriends")]
        public async Task<IActionResult> getFriendListAsync()
        {
            FriendResponse response = new FriendResponse();

            try
            {
                List<string> friendList = await DataContext.FriendsLists
                    .Where(obj => obj.FirstUserInfo.UserName == getUserName() || obj.SecondUserInfo.UserName == getUserName())
                    .Select(obj => obj.FirstUserInfo.UserName == getUserName() ? obj.SecondUserInfo.UserName : obj.FirstUserInfo.UserName).ToListAsync();

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

                var doesInviteExist = await DataContext.FriendInvites
                    .SingleOrDefaultAsync(obj => obj.SenderUserId == friendsInfo.MainUserId && obj.TargetUserId == friendsInfo.FriendUserId);

                if (doesInviteExist != null)
                {
                    response.Success = true;
                    response.Message = "Such invite already exist";
                    return Ok(response);
                }

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
                FriendsList? friendsList = await DataContext.FriendsLists.SingleOrDefaultAsync(obj => (obj.FirstUserInfo.UserName == getUserName() && obj.SecondUserInfo.UserName == FriendName) ||
                    obj.FirstUserInfo.UserName == FriendName && obj.SecondUserInfo.UserName == getUserName());
                if (friendsList == null)
                    return Ok(response);

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

        [HttpGet("getinvites")]
        public async Task<IActionResult> getInvitesAsync()
        {
            FriendResponse response = new FriendResponse();

            try
            {
                var invites = DataContext.FriendInvites.Where(obj => obj.TargetUserInfo.UserName == getUserName()).Select(obj => obj.SenderUserInfo.UserName);

                if (invites != null)
                    response.FriendList = invites.ToList();
                else
                    response.FriendList = new List<string>();
            }
            catch(Exception ex)
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
            List<FriendInvites> invites = new List<FriendInvites>();
            try
            {
                var toMainUserInvite = await DataContext.FriendInvites
                    .SingleOrDefaultAsync(obj => obj.TargetUserInfo.UserName == getUserName() && obj.SenderUserInfo.UserName == FriendName);

                if (toMainUserInvite == null)
                    return Ok(response);

                var fromMainUserInvite = await DataContext.FriendInvites
                    .SingleOrDefaultAsync(obj => obj.SenderUserInfo.UserName == getUserName() && obj.TargetUserInfo.UserName == FriendName);

                if (fromMainUserInvite != null)
                    invites.Add(fromMainUserInvite);

                invites.Add(toMainUserInvite);

                long firstUserId = Math.Max(toMainUserInvite.SenderUserId, toMainUserInvite.TargetUserId);
                long secondUserId = Math.Min(toMainUserInvite.SenderUserId, toMainUserInvite.TargetUserId);

                FriendsList friendsList = new FriendsList()
                {
                    FirstUserId = firstUserId,
                    SecondUserId = secondUserId
                };

                DataContext.FriendInvites.RemoveRange(invites);
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
                FriendInvites? friendInvite = await DataContext.FriendInvites.SingleOrDefaultAsync(obj => obj.TargetUserInfo.UserName == getUserName() && obj.SenderUserInfo.UserName == FriendName);
                if (friendInvite == null)
                    return Ok(response);

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
        public bool Success { get; set; } = true;

        public string Message { get; set; } = "Request has failed";

        public List<string> FriendList { get; set; } = new List<string>();
    }
}
