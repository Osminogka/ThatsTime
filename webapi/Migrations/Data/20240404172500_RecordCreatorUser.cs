using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations.Data
{
    /// <inheritdoc />
    public partial class RecordCreatorUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Records_CreatorId",
                table: "Records",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Records_UserInfo_CreatorId",
                table: "Records",
                column: "CreatorId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Records_UserInfo_CreatorId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_CreatorId",
                table: "Records");
        }
    }
}
