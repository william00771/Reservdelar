using begdelar.api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TestDB")));

var app = builder.Build();

app.MapGet("/UPricefileManual", async (AppDbContext db) => 
    (await db.UPricefileManuals.ToListAsync()).Any() ? Results.Ok(await db.UPricefileManuals.ToListAsync()) : Results.NotFound("No records found."));

app.Run();