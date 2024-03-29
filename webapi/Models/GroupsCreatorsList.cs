using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class GroupsCreatorsList
    {
        [Key]
        public int GroupId { get; set; }

        [Required]
        public string GroupName { get; set; } = string.Empty;

        [Required]
        public string CreatorId { get; set; } = string.Empty;
    }
}
