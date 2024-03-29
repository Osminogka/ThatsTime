using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public int selectedYear { get; set; }

        [Required]
        [Range(1, 12)]
        public int selectedMonth { get; set; }

        [Required]
        [Range(1, 31)]
        public int selectedDay { get; set; }

        [Required]
        public string selectedObject { get; set; } = string.Empty;

        [Required]
        public string Creator { get; set; } = string.Empty;

        [Required]
        public bool yourSelf { get; set; }

        [Required]
        public bool showGroupList { get; set; }

        [Required]
        [Range(0, 23)]
        public int hour { get; set; }

        [Required]
        [Range(0, 59)]
        public int minute { get; set; }

        [Required]
        [StringLength(1, MinimumLength = 50)]
        public string recordName { get; set; } = string.Empty;

        [Required]
        [StringLength(1, MinimumLength = 500)]
        public string recordContent { get; set; } = string.Empty;
    }
}
