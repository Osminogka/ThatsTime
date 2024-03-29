using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class UserInfo
    {
        [Key]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;
    }
}
