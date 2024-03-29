using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class FriendsList
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstUserId { get; set; } = string.Empty;

        [Required]
        public string SecondUserId { get; set; } = string.Empty;
    }
}
