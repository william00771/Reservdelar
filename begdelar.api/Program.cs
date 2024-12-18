using begdelar.api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TestDB")));

var app = builder.Build();
app.UseCors("AllowAllOrigins");

app.MapGet("/UPricefileManual", async (AppDbContext db) => 
    (await db.UPricefileManuals.ToListAsync()).Any() ? Results.Ok(await db.UPricefileManuals.ToListAsync()) : Results.NotFound("No records found."));

app.MapPut("/UPricefileManual", async (List<UPricefileMANUALPutRequestDto> updatedRow, AppDbContext db) =>
{
    var sqlQuery = @"
        WITH CTE AS (
            SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum
            FROM [Reservdelar].[dbo].[UPricefileMANUAL]
        )
        UPDATE CTE
        SET 
            DescrEng = {1},
            Retail = {2},
            Export = {3},
            Prg = {4},
            Disccode = {5},
            DescrLoc = {6},
            Origin = {7},
            Wgt = {8},
            Qnt = {9},
            Qtfak1 = {10},
            Qtfak2 = {11},
            UnitType = {12},
            ReplacingNo = {13},
            Partgrp = {14},
            StatofOrig = {15},
            ArticleGroup = {16},
            Replcode = {17},
            [CORE kat] = {18},
            CC = {19},
            Custcode = {20},
            Supplno = {21},
            ValidFrom = {22},
            DiscountCode = {23}
        WHERE RowNum = {0}
    ";

    for (int i = 0; i < updatedRow.Count; i++)
    {
        await db.Database.ExecuteSqlRawAsync
        (
            sqlQuery,
            updatedRow[i].Id!,
            updatedRow[i].DescrEng!,
            updatedRow[i].Retail!,
            updatedRow[i].Export!,
            updatedRow[i].Prg!,
            updatedRow[i].Disccode!,
            updatedRow[i].DescrLoc!,
            updatedRow[i].Origin!,
            updatedRow[i].Wgt!,
            updatedRow[i].Qnt!,
            updatedRow[i].Qtfak1!,
            updatedRow[i].Qtfak2!,
            updatedRow[i].UnitType!,
            updatedRow[i].ReplacingNo!,
            updatedRow[i].Partgrp!,
            updatedRow[i].StatofOrig!,
            updatedRow[i].ArticleGroup!,
            updatedRow[i].Replcode!,
            updatedRow[i].CoreKat!,
            updatedRow[i].CC!,
            updatedRow[i].Custcode!,
            updatedRow[i].Supplno!,
            updatedRow[i].ValidFrom!,
            updatedRow[i].DiscountCode!
        );
    }

    return Results.Ok("Row updated successfully.");
});

app.MapPost("/UPricefileManual", async (UPricefileManual newRow, AppDbContext db) =>
{
    db.UPricefileManuals.Add(newRow);
    await db.SaveChangesAsync();
    return Results.Created($"/UPricefileManual/{newRow.Artnr}", newRow);
});

app.Run();