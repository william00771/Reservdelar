using begdelar.api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TestDB")));

var app = builder.Build();

app.MapGet("/UPricefileManual", async (AppDbContext db) => 
    (await db.UPricefileManuals.ToListAsync()).Any() ? Results.Ok(await db.UPricefileManuals.ToListAsync()) : Results.NotFound("No records found."));

app.MapPut("/UPricefileManual", async (List<UPricefileManual> updatedRows, AppDbContext db) =>
{
    if (updatedRows == null || !updatedRows.Any())
    {
        return Results.BadRequest("No data provided for update.");
    }
    foreach (var updatedRow in updatedRows)
    {
        var existingRow = await db.UPricefileManuals
            .FirstOrDefaultAsync(r => r.Artnr == updatedRow.Artnr);

        if (existingRow != null)
        {
            db.Entry(existingRow).CurrentValues.SetValues(updatedRow);
        }
    }

    await db.SaveChangesAsync();
    return Results.Ok("Rows updated successfully.");
});

app.Run();