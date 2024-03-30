using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public int SelectedYear { get; set; }

        [Required]
        [Range(1, 12)]
        public int SelectedMonth { get; set; }

        [Required]
        [Range(1, 31)]
        public int SelectedDay { get; set; }

        public bool IsRecordForGroup { get; set; }

        //Foreign key to userInfo userId
        public long? RelatedUserId { get; set; }
        public UserInfo RelatedUser { get; set; }

        //Foreign key to GroupCreatorList groupId
        public long? RelatedGroupId { get; set; }
        public GroupsCreatorsList RelatedGroup { get; set; }

        [Required]
        public long CreatorId { get; set; }

        [Required]
        public bool IsRecordForYourSelf { get; set; }

        [Required]
        [Range(0, 23)]
        public int Hour { get; set; }

        [Required]
        [Range(0, 59)]
        public int Minute { get; set; }

        [Required]
        [StringLength(1, MinimumLength = 50)]
        public string RecordName { get; set; } = string.Empty;

        [Required]
        [StringLength(1, MinimumLength = 500)]
        public string RecordContent { get; set; } = string.Empty;
    }
}
