using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations.Data
{
    /// <inheritdoc />
    public partial class RecordValueTypeFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RecordName",
                table: "Records",
                type: "nvarchar(50)",
                maxLength: 1,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1)",
                oldMaxLength: 1);

            migrationBuilder.AlterColumn<string>(
                name: "RecordContent",
                table: "Records",
                type: "nvarchar(500)",
                maxLength: 1,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RecordName",
                table: "Records",
                type: "nvarchar(1)",
                maxLength: 1,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 1);

            migrationBuilder.AlterColumn<string>(
                name: "RecordContent",
                table: "Records",
                type: "nvarchar(50)",
                maxLength: 1,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 1);
        }
    }
}
