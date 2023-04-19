// dotnet aspnet-codegenerator controller -name TokenController -async -api -m TokenItem -dc TokenContext -outDir Controllers

namespace TodoApi.Models
{
    public class TokenItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}