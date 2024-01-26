
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

    }
}