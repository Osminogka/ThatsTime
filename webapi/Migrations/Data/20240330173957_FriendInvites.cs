using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations.Data
{
    /// <inheritdoc />
    public partial class FriendInvites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FriendsLists",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstUserId = table.Column<long>(type: "bigint", nullable: false),
                    SecondUserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendsLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Records",
                columns: table => new
                {
                    RecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SelectedYear = table.Column<int>(type: "int", nullable: false),
                    SelectedMonth = table.Column<int>(type: "int", nullable: false),
                    SelectedDay = table.Column<int>(type: "int", nullable: false),
                    SelectedObjectId = table.Column<long>(type: "bigint", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    YourSelf = table.Column<bool>(type: "bit", nullable: false),
                    ShowGroupList = table.Column<bool>(type: "bit", nullable: false),
                    Hour = table.Column<int>(type: "int", nullable: false),
                    Minute = table.Column<int>(type: "int", nullable: false),
                    RecordName = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    RecordContent = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Records", x => x.RecordId);
                });

            migrationBuilder.CreateTable(
                name: "UserInfo",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInfo", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "FriendInvites",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderUserId = table.Column<long>(type: "bigint", maxLength: 450, nullable: false),
                    TargetUserId = table.Column<long>(type: "bigint", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendInvites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FriendInvites_UserInfo_SenderUserId",
                        column: x => x.SenderUserId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FriendInvites_UserInfo_TargetUserId",
                        column: x => x.TargetUserId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupsCreatorsLists",
                columns: table => new
                {
                    GroupId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupsCreatorsLists", x => x.GroupId);
                    table.ForeignKey(
                        name: "FK_GroupsCreatorsLists_UserInfo_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupInvites",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    TargetUserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupInvites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupInvites_GroupsCreatorsLists_GroupId",
                        column: x => x.GroupId,
                        principalTable: "GroupsCreatorsLists",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupInvites_UserInfo_TargetUserId",
                        column: x => x.TargetUserId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupMemberLists",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    MemberId = table.Column<long>(type: "bigint", nullable: false),
                    MemberDegree = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMemberLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupMemberLists_GroupsCreatorsLists_GroupId",
                        column: x => x.GroupId,
                        principalTable: "GroupsCreatorsLists",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupMemberLists_UserInfo_MemberId",
                        column: x => x.MemberId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendInvites_SenderUserId",
                table: "FriendInvites",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendInvites_TargetUserId",
                table: "FriendInvites",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupInvites_GroupId",
                table: "GroupInvites",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupInvites_TargetUserId",
                table: "GroupInvites",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMemberLists_GroupId",
                table: "GroupMemberLists",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMemberLists_MemberId",
                table: "GroupMemberLists",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupsCreatorsLists_CreatorId",
                table: "GroupsCreatorsLists",
                column: "CreatorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendInvites");

            migrationBuilder.DropTable(
                name: "FriendsLists");

            migrationBuilder.DropTable(
                name: "GroupInvites");

            migrationBuilder.DropTable(
                name: "GroupMemberLists");

            migrationBuilder.DropTable(
                name: "Records");

            migrationBuilder.DropTable(
                name: "GroupsCreatorsLists");

            migrationBuilder.DropTable(
                name: "UserInfo");
        }
    }
}
