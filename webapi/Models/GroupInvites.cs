using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class GroupInvites
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int GroupId { get; set; }

        [Required]
        public string TargetUserId { get; set; } = string.Empty;
    }
}
