using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class FriendInvites
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SenderUserId { get; set; } = string.Empty;

        [Required]
        public string TargetUserId { get; set; } = string.Empty;
    }
}
