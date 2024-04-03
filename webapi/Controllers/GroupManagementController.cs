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
    [Route("api/groups")]
    public class GroupManagementController : MyBaseController
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

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                GroupsCreatorsList? group = await DataContext.GroupsCreatorsLists.SingleOrDefaultAsync(obj => obj.GroupName == groupname);
                if (group != null)
                {
                    response.Message = "Such group already exist";
                    return Ok(response);
                }

                GroupsCreatorsList newGroup = new GroupsCreatorsList()
                {
                    GroupName = groupname,
                    CreatorId = mainUser.UserId
                };

                await DataContext.GroupsCreatorsLists.AddAsync(newGroup);
                await DataContext.SaveChangesAsync();

                GroupMemberList newMember = new GroupMemberList()
                {
                    MemberId = mainUser.UserId,
                    GroupId = newGroup.GroupId
                };

                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Group created successfully";

            return Ok(response);
        }

        [HttpGet("enter")]
        public async Task<IActionResult> enterGroupAsync([FromQuery] string groupname)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                GroupsCreatorsList? group = await DataContext.GroupsCreatorsLists
                    .Include(member => member.GroupMembers.Where(user => user.MemberId == mainUser.UserId))
                    .SingleOrDefaultAsync(group => group.GroupName == groupname);

                if (group == null || group?.GroupMembers.Count > 0)
                    return Ok(response);

                GroupMemberList newMember = new GroupMemberList()
                {
                    GroupId = group.GroupId,
                    MemberId = mainUser.UserId
                };

                await DataContext.GroupMemberLists.AddAsync(newMember);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Successfully entered the group";

            return Ok(response);
        }

        [HttpGet("sendinvite")]
        public async Task<IActionResult> sendInviteToGroupAsync([FromQuery] GroupRequest request)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(user => user.GroupMembers.Where(group => group.RelatedGroup.GroupName == request.GroupName))
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());

                if (mainUser == null)
                    return Ok(response);

                var groupMember = mainUser.GroupMembers.FirstOrDefault(group => group.RelatedGroup.GroupName == request.GroupName);
                if (groupMember == null)
                    return Ok(response);

                UserInfo? friend = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == request.FriendName);
                if (friend == null)
                    return Ok(response);

                long firstUserId = Math.Max(mainUser.UserId, friend.UserId);
                long secondUserId = Math.Min(mainUser.UserId, friend.UserId);

                FriendsList? areFriends = await DataContext.FriendsLists.SingleOrDefaultAsync(obj => obj.FirstUserId == firstUserId && obj.SecondUserId == secondUserId);
                if (areFriends == null)
                    return Ok(response);


                GroupInvites groupInvite = new GroupInvites()
                {
                    GroupId = groupMember.GroupId,
                    TargetUserId = friend.UserId
                };

                await DataContext.GroupInvites.AddAsync(groupInvite);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Group invite request is sent";

            return Ok(response);
        }

        [HttpGet("acceptinvite")]
        public async Task<IActionResult> acceptInviteToGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(user => user.GroupInvites.Where(group => group.GroupEntity.GroupName == groupname))
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                var groupInvite = mainUser.GroupInvites.FirstOrDefault(invite => invite.GroupEntity.GroupName == groupname);

                if (groupInvite == null)
                    return Ok(response);

                GroupMemberList newMember = new GroupMemberList()
                {
                    GroupId = groupInvite.GroupId,
                    MemberId = mainUser.UserId
                };

                DataContext.GroupInvites.Remove(groupInvite);
                await DataContext.GroupMemberLists.AddAsync(newMember);

            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Successfully enterd group";

            return Ok(response);
        }

        [HttpGet("declineinvite")]
        public async Task<IActionResult> declineInviteToGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(user => user.GroupInvites.Where(group => group.GroupEntity.GroupName == groupname))
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());

                if (mainUser == null)
                    return Ok(response);

                var groupInvite = mainUser.GroupInvites.FirstOrDefault(group => group.GroupEntity.GroupName == groupname);
                if (groupInvite == null)
                    return Ok(response);

                DataContext.GroupInvites.Remove(groupInvite);
                await DataContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Successfully decline group invite";

            return Ok(response);
        }

        [HttpGet("leave")]
        public async Task<IActionResult> leaveGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(user => user.GroupMembers.Where(group => group.RelatedGroup.GroupName == groupname))
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());
                if (mainUser == null)
                    return Ok(response);

                var group = mainUser.GroupMembers.FirstOrDefault(group => group.RelatedGroup.GroupName == groupname);
                if (group == null)
                    return Ok(response);

                var CreatorOfGroup = await DataContext.GroupsCreatorsLists.SingleOrDefaultAsync(obj => obj.GroupName == groupname && obj.CreatorId == mainUser.UserId);
                if(CreatorOfGroup != null)
                {
                    var firstMember = await DataContext.GroupMemberLists.FirstOrDefaultAsync(obj => obj.GroupId == group.GroupId && obj.MemberId != mainUser.UserId);
                    if (firstMember == null)
                        DataContext.GroupsCreatorsLists.Remove(CreatorOfGroup);
                    else
                        CreatorOfGroup.CreatorId = firstMember.MemberId;
                }
                DataContext.GroupMemberLists.Remove(group);

                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            return Ok(response);
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
