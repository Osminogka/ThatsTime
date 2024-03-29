using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class GroupMemberList
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string GroupId { get; set; } = string.Empty;

        [Required]
        public string MemberId { get; set; } = string.Empty;

        [Required]
        public string MemberDegree { get; set; } = string.Empty;
    }
}
