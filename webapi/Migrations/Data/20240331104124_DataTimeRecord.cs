using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations.Data
{
    /// <inheritdoc />
    public partial class DataTimeRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hour",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "Minute",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "SelectedDay",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "SelectedMonth",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "SelectedYear",
                table: "Records");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Records",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Records");

            migrationBuilder.AddColumn<int>(
                name: "Hour",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Minute",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SelectedDay",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SelectedMonth",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SelectedYear",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
