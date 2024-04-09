using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
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

        [HttpGet("getgroups")]
        public async Task<IActionResult> getGroupsAsync([FromQuery] int page)
        {
            GroupResponse response = new GroupResponse();
            const int pageSize = 10;
            try
            {
                string mainUserName = getUserName();
                response.Groups.AddRange(await DataContext.GroupsCreatorsLists
                    .Where(obj => obj.GroupMembers.Where(member => member.RelatedUser.UserName == mainUserName).Count() == 0)
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Select(obj => obj.GroupName)
                    .ToListAsync());
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Got all groups";
            return Ok(response);
        }

        [HttpGet("getcertaingroup")]
        public async Task<IActionResult> getCertainGroupAsync([FromQuery] string groupname)
        {
            GroupResponse response = new GroupResponse();
            try
            {
                string mainUserName = getUserName();
                GroupsCreatorsList? group = await DataContext.GroupsCreatorsLists
                    .SingleOrDefaultAsync(obj => obj.GroupName == groupname && obj.GroupMembers.Where(member => member.RelatedUser.UserName == mainUserName).Count() == 0);
                if(group == null)
                {
                    response.Message = "Such groupo doesn't exist";
                    return Ok(response);
                }

                response.Groups.Add(group.GroupName);
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Got certain group";
            return Ok(response);
        }

        [HttpGet("getmygroups")]
        public async Task<IActionResult> getMyGroupsAsync()
        {
            GroupResponse response = new GroupResponse();
            try
            {
                response.Groups.AddRange(await DataContext.GroupMemberLists.Where(obj => obj.RelatedUser.UserName == getUserName()).Select(obj => obj.RelatedGroup.GroupName).ToListAsync());
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }
            response.Success = true;
            response.Message = "Got all groups";
            return Ok(response);
        } 

        [HttpPost("create")]
        public async Task<IActionResult> createGroupAsync([FromQuery] string groupname)
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
                    CreatorId = mainUser.UserId,
                };

                await DataContext.GroupsCreatorsLists.AddAsync(newGroup);
                await DataContext.SaveChangesAsync();

                GroupMemberList newMember = new GroupMemberList()
                {
                    MemberId = mainUser.UserId,
                    GroupId = newGroup.GroupId,
                    MemberDegree = "Creator"
                };

                await DataContext.GroupMemberLists.AddAsync(newMember);
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
                    MemberId = mainUser.UserId,
                    MemberDegree = "Member"
                };

                await DataContext.GroupMemberLists.AddAsync(newMember);
                await DataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Successfully entered the group";
            return Ok(response);
        }

        [HttpGet("getinvites")]
        public async Task<IActionResult> getGroupInvitesAsync()
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(obj => obj.GroupInvites).ThenInclude(obj => obj.GroupEntity)
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());

                if (mainUser == null)
                    return Ok(response);

                response.Groups = mainUser.GroupInvites.Select(obj => obj.GroupEntity.GroupName).ToList();
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }

            response.Success = true;
            response.Message = "Got all invites";
            return Ok(response);
        }

        [HttpGet("sendinvite")]
        public async Task<IActionResult> sendInviteToGroupAsync([FromQuery] string groupName, [FromQuery] string friendName)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                UserInfo? mainUser = await DataContext.UserInfo
                    .Include(user => user.GroupMembers.Where(group => group.RelatedGroup.GroupName == groupName)).ThenInclude(obj => obj.RelatedGroup)
                    .SingleOrDefaultAsync(obj => obj.UserName == getUserName());

                if (mainUser == null)
                    return Ok(response);

                var groupMember = mainUser.GroupMembers.SingleOrDefault(group => group.RelatedGroup.GroupName == groupName && group.MemberId == mainUser.UserId);
                if (groupMember == null)
                    return Ok(response);

                UserInfo? friend = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == friendName);
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

            response.Success = true;
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

                var groupInvite = mainUser.GroupInvites.SingleOrDefault(invite => invite.GroupEntity.GroupName == groupname);

                if (groupInvite == null)
                    return Ok(response);

                GroupMemberList newMember = new GroupMemberList()
                {
                    GroupId = groupInvite.GroupId,
                    MemberId = mainUser.UserId,
                    MemberDegree = "Member"
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

                var groupInvite = mainUser.GroupInvites.SingleOrDefault(group => group.GroupEntity.GroupName == groupname);
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

        [HttpGet("remove")]
        public async Task<IActionResult> removeUserFromGroupAsync([FromQuery] string groupName, [FromQuery] string friendName)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                GroupsCreatorsList? group = await DataContext.GroupsCreatorsLists.SingleOrDefaultAsync(obj => obj.GroupName == groupName && obj.Creator.UserName == getUserName());
                if (group == null)
                {
                    response.Message = "You are not creator of the group";
                    return Ok(response);
                }
                GroupMemberList? member = await DataContext.GroupMemberLists.SingleOrDefaultAsync(obj => obj.GroupId == group.GroupId && obj.RelatedUser.UserName == friendName);
                if(member == null)
                {
                    response.Message = "This user isn't member of this group";
                    return Ok(response);
                }
                DataContext.GroupMemberLists.Remove(member);
                await DataContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return HandleException(ex);
            }

            response.Message = "Request has succeeded";
            return Ok(response);
        }

        [HttpGet("leave")]
        public async Task<IActionResult> leaveGroupAsync(string groupname)
        {
            GroupResponse response = new GroupResponse();

            try
            {
                string mainUsername = getUserName();

                GroupsCreatorsList? group = await DataContext.GroupsCreatorsLists
                    .Include(group => group.Creator)
                    .Include(group => group.GroupMembers
                        .Where(member => member.RelatedUser.UserName == mainUsername))
                        .ThenInclude(member => member.RelatedUser)
                    .SingleOrDefaultAsync(obj => obj.GroupName == groupname);
                if (group == null)
                    return Ok(response);
                GroupMemberList? groupMember = group.GroupMembers.Where(member => member.RelatedUser.UserName == mainUsername).First();
                if (groupMember == null)
                    return Ok(response);
                if(group.Creator.UserName == mainUsername)
                {
                    var firstMember = await DataContext.GroupMemberLists.FirstOrDefaultAsync(obj => obj.GroupId == group.GroupId && obj.RelatedUser.UserName != mainUsername);
                    if (firstMember == null)
                        DataContext.GroupsCreatorsLists.Remove(group);
                    else
                        group.CreatorId = firstMember.MemberId;
                }

                DataContext.GroupMemberLists.Remove(group.GroupMembers.Where(member => member.RelatedUser.UserName == mainUsername).First());
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

        public List<string> Groups { get; set; } = new List<string>();
    }

    public class GroupRequest
    {
        public string FriendName { get; set; }

        public string GroupName { get; set; }
    }

}
