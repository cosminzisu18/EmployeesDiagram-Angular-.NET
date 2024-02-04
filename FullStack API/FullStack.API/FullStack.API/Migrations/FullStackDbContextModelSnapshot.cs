﻿// <auto-generated />
using System;
using FullStack.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FullStack.API.Migrations
{
    [DbContext(typeof(FullStackDbContext))]
    partial class FullStackDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FullStack.API.Models.Departments", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NameDepartment")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("FullStack.API.Models.Employees", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("EmployersId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Salary")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployersId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("FullStack.API.Models.Employers", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DepartmentEmployer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailEmployer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameEmployer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneEmployer")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Employers");
                });

            modelBuilder.Entity("FullStack.API.Models.LogError", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ErrorMessage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("LogError");
                });

            modelBuilder.Entity("FullStack.API.Models.Observations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<Guid>("EmployeesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("EmployersId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Note")
                        .HasColumnType("int");

                    b.Property<string>("Observation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("EmployeesId");

                    b.HasIndex("EmployersId");

                    b.ToTable("Observations");
                });

            modelBuilder.Entity("FullStack.API.Models.Employees", b =>
                {
                    b.HasOne("FullStack.API.Models.Employers", "Employers")
                        .WithMany("Employees")
                        .HasForeignKey("EmployersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employers");
                });

            modelBuilder.Entity("FullStack.API.Models.Observations", b =>
                {
                    b.HasOne("FullStack.API.Models.Employees", "Employees")
                        .WithMany("Observations")
                        .HasForeignKey("EmployeesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FullStack.API.Models.Employers", "Employers")
                        .WithMany("Observations")
                        .HasForeignKey("EmployersId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Employees");

                    b.Navigation("Employers");
                });

            modelBuilder.Entity("FullStack.API.Models.Employees", b =>
                {
                    b.Navigation("Observations");
                });

            modelBuilder.Entity("FullStack.API.Models.Employers", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Observations");
                });
#pragma warning restore 612, 618
        }
    }
}
