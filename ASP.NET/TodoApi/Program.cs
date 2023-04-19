using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Helpers;
using TodoApi.Services;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<userService>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("userService") ?? throw new InvalidOperationException("Connection string 'userService' not found.")));


// add services to DI container
{
    var services = builder.Services;
    services.AddCors();
    services.AddControllers();

    // configure strongly typed settings object
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    // configure DI for application services
    services.AddScoped<IUserService, UserService>();
}


// Add services to the container.

// builder.Services.AddControllers(); 
// builder.Services.AddDbContext<TodoContext>(opt =>
//     opt.UseInMemoryDatabase("TodoList"));
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new() { Title = "TodoApi", Version = "v1" });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.



// configure HTTP request pipeline
{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();
}


// if (builder.Environment.IsDevelopment())
// {
//     app.UseDeveloperExceptionPage();
//     //app.UseSwagger();
//     //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TodoApi v1"));
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();

// app.MapControllers();

// // custom jwt auth middleware
// app.UseMiddleware<JwtMiddleware>();

app.Run();
