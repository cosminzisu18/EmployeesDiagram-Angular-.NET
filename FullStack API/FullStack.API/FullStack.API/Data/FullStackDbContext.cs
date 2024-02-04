
using FullStack.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employees> Employees { get; set; } 
        public DbSet<Employers> Employers { get; set; }
        public DbSet<Departments> Departments { get; set; }
        public DbSet<LogError> LogError { get; set; }
        public DbSet<Observations> Observations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Observations>()
                .HasOne(o => o.Employers)
                .WithMany(e => e.Observations)
                .HasForeignKey(o => o.EmployersId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}