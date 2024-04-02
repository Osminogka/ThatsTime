using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using webapi.Models;
using System.Security.Claims;

namespace webapi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/records")]
    public class RecordsController : ControllerBase
    {
        public DataContext DataContext;

        public RecordsController(DataContext ctx)
        {
            DataContext = ctx;
        }

        [HttpPost("newrecord")]
        public async Task<IActionResult> postRecordAsync([FromBody] RecordFromFrontEnd recordFromFrontEnd)
        {
            RecordResponse response = new RecordResponse();

            if (!recordFromFrontEnd.isValid())
                return Ok(response);

            try
            {
                GroupsCreatorsList? relatedGroup = null;
                UserInfo? relatedUser = null;
                if (recordFromFrontEnd.showGroupList)
                    relatedGroup = await DataContext.GroupsCreatorsLists.SingleOrDefaultAsync(obj => obj.GroupName == recordFromFrontEnd.selectedObject);
                else
                    relatedUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == recordFromFrontEnd.selectedObject);

                if(recordFromFrontEnd.showGroupList ? relatedGroup == null : relatedUser == null)
                    return Ok(response);

                long selectedObjectId = recordFromFrontEnd.showGroupList ? relatedGroup.GroupId : relatedUser.UserId;

                UserInfo? mainUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == getUserName());

                if (mainUser == null)
                    return Ok(response);

                if (!(await canUserMakeAction(selectedObjectId, mainUser.UserId, recordFromFrontEnd.showGroupList)))
                    return Ok(response);

                Record record = new Record(recordFromFrontEnd, selectedObjectId, mainUser.UserId);
                await DataContext.Records.AddAsync(record);
                await DataContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while updating the database.");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An unexpected error occurred.");
            }

            response.Success = true;
            response.Message = "Record is created!";

            return Ok(response);
           
        }

        [HttpGet("certain")]
        public async Task<IActionResult> getCertainRecordAsync([FromBody] CertainRecord certainRecord)
        {
            RecordResponse response = new RecordResponse();
            try
            {
                List<Record> records = new List<Record>();
                GroupsCreatorsList? relatedGroup = null;
                UserInfo? relatedUser = null;
                if (certainRecord.ForYourSelf)
                {

                    records = await DataContext.Records.Where(obj => obj.CreatorId == 1).ToListAsync();
                }
                if (certainRecord.IsGroup)
                    relatedGroup = await DataContext.GroupsCreatorsLists.SingleOrDefaultAsync(obj => obj.GroupName == certainRecord.RelatedObject);
                else
                    relatedUser = await DataContext.UserInfo.SingleOrDefaultAsync(obj => obj.UserName == certainRecord.RelatedObject);

                if (certainRecord.IsGroup ? relatedGroup == null : relatedUser == null)
                    return Ok(response);

                long relatedObjectId = certainRecord.IsGroup ? relatedGroup.GroupId : relatedUser.UserId;

                records = await DataContext.Records.Where(obj => certainRecord.IsGroup ? obj.RelatedGroupId == relatedObjectId : obj.RelatedUserId == relatedObjectId).ToListAsync();
                response.Records = records;
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while processing the request.");
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "More than one element satisfies the condition in SingleOrDefault.");
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while updating the database.");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An unexpected error occurred.");
            }
            response.Success = true;
            response.Message = "Got all records";
            return Ok(response);
        }

        [HttpGet("friend")]
        public async Task<IActionResult> getRecordsWithFriendAsync()
        {
            RecordResponse response = new RecordResponse();

            return Ok(response);
        }

        [HttpGet("group")]
        public async Task<IActionResult> getRecordsWithGroupAsync()
        {
            return Ok();
        }

        [HttpGet("recent")]
        public async Task<IActionResult> getRecentRecordsAsync()
        {
            return Ok();
        }

        private async Task<bool> canUserMakeAction(long relatedObjectId, long mainUserId, bool isGroup)
        {
            if (isGroup)
            {
                GroupMemberList? isMember = await DataContext.GroupMemberLists.SingleOrDefaultAsync(obj => obj.MemberId == mainUserId);
                if (isMember == null)
                    return false;
            }
            else
            {
                long firstUserId = Math.Max(mainUserId, relatedObjectId);
                long secondUserId = Math.Min(mainUserId, relatedObjectId);

                FriendsList? areFriends = await DataContext.FriendsLists.SingleOrDefaultAsync(obj => obj.FirstUserId == firstUserId && obj.SecondUserId == secondUserId);
                if (areFriends == null)
                    return false;
            }

            return true;
        }

        private string getUserName()
        {
            return HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
        }
    }

    public class RecordResponse
    {
        public bool Success { get; set; } = false;

        public string Message { get; set; } = "Request has failed";

        public List<Record> Records { get; set; } = new List<Record>();
    }

    public class RecordFromFrontEnd
    {
        public int selectedYear { get; set; }
        public int selectedMonth { get; set; }
        public int selectedDay { get; set; }
        public bool showGroupList { get; set; }
        public bool yourSelf { get; set; }
        public string selectedObject { get; set; }
        public int importance { get; set; }
        public int hour { get; set; }
        public int minute { get; set; }
        public string recordName { get; set; }
        public string recordContent { get; set; }

        public bool isValid()
        {
            if(!isDateValid() ||
                selectedObject.IsNullOrEmpty() ||
                !(0 <= hour && hour <= 23) ||
                !(0 <= minute && minute <= 59) ||
                !(recordName.Length >= 1 && recordName.Length <= 50) ||
                !(recordContent.Length >= 1 && recordContent.Length <= 500) ||
                !(importance >= 0 && importance <= 2)
                )
                return false;
           return true;
        }

        private bool isDateValid()
        {
            string format = "yyyy-MM-dd HH:mm";
            string inputDate = $"{selectedYear:D4}-{selectedMonth:D2}-{selectedDay:D2} {hour:D2}:{minute:D2}";

            // Try parsing the input string into a DateTime object
            if (DateTime.TryParseExact(inputDate, format, null, System.Globalization.DateTimeStyles.None, out _))
                return true;
            else
                return false;
        }
    }

    public class CertainRecord
    {
        public string RelatedObject { get; set; } = string.Empty;

        public bool ForYourSelf { get; set; }

        public bool IsGroup { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }
    }
}
