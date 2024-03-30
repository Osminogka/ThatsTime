using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations.Data
{
    /// <inheritdoc />
    public partial class AllRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YourSelf",
                table: "Records",
                newName: "IsRecordForYourSelf");

            migrationBuilder.RenameColumn(
                name: "ShowGroupList",
                table: "Records",
                newName: "IsRecordForGroup");

            migrationBuilder.RenameColumn(
                name: "SelectedObjectId",
                table: "Records",
                newName: "RelatedUserId");

            migrationBuilder.AddColumn<long>(
                name: "RelatedGroupId",
                table: "Records",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Records_RelatedGroupId",
                table: "Records",
                column: "RelatedGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Records_RelatedUserId",
                table: "Records",
                column: "RelatedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendsLists_FirstUserId",
                table: "FriendsLists",
                column: "FirstUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendsLists_SecondUserId",
                table: "FriendsLists",
                column: "SecondUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendsLists_UserInfo_FirstUserId",
                table: "FriendsLists",
                column: "FirstUserId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FriendsLists_UserInfo_SecondUserId",
                table: "FriendsLists",
                column: "SecondUserId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Records_GroupsCreatorsLists_RelatedGroupId",
                table: "Records",
                column: "RelatedGroupId",
                principalTable: "GroupsCreatorsLists",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Records_UserInfo_RelatedUserId",
                table: "Records",
                column: "RelatedUserId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendsLists_UserInfo_FirstUserId",
                table: "FriendsLists");

            migrationBuilder.DropForeignKey(
                name: "FK_FriendsLists_UserInfo_SecondUserId",
                table: "FriendsLists");

            migrationBuilder.DropForeignKey(
                name: "FK_Records_GroupsCreatorsLists_RelatedGroupId",
                table: "Records");

            migrationBuilder.DropForeignKey(
                name: "FK_Records_UserInfo_RelatedUserId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_RelatedGroupId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_RelatedUserId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_FriendsLists_FirstUserId",
                table: "FriendsLists");

            migrationBuilder.DropIndex(
                name: "IX_FriendsLists_SecondUserId",
                table: "FriendsLists");

            migrationBuilder.DropColumn(
                name: "RelatedGroupId",
                table: "Records");

            migrationBuilder.RenameColumn(
                name: "RelatedUserId",
                table: "Records",
                newName: "SelectedObjectId");

            migrationBuilder.RenameColumn(
                name: "IsRecordForYourSelf",
                table: "Records",
                newName: "YourSelf");

            migrationBuilder.RenameColumn(
                name: "IsRecordForGroup",
                table: "Records",
                newName: "ShowGroupList");
        }
    }
}
