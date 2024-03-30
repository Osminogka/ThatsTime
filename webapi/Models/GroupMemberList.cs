using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class GroupMemberList
    {
        [Key]
        public long Id { get; set; }

        //Foreign key to GroupsCreatorList.GroupId
        public long GroupId { get; set; }

        //Navigation property to GroupsCreatorsList
        public GroupsCreatorsList RelatedGroup { get; set; }

        //Foreign key to UserInfo.UserId
        public long MemberId { get; set; }

        //Navigation property to UserInfo
        public UserInfo RelatedUser { get; set; }

        [Required]
        public string MemberDegree { get; set; } = string.Empty;
    }
}
