using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TodoApi.Models
{
    public class TokenContext : DbContext
    {
        public TokenContext(DbContextOptions<TokenContext> options)
            : base(options)
        {
        }

        public DbSet<TokenItem> TodoItems { get; set; } = null!;
    }
}