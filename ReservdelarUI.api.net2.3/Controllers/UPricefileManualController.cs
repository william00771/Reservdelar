using ReservdelarUI.api.net2._3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservdelarUI.api.net2._0.Controllers
{
    [Route("api/[controller]")]
    public class UPricefileManualController : Controller
    {
        private readonly AppDbContext _db;

        public UPricefileManualController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _db.UPricefileManuals.ToListAsync();

            if (records.Any())
            {
                return Ok(records);
            }
            else
            {
                return NotFound("No records found.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] List<UPricefileMANUALPutRequestDto> updatedRows)
        {
            if (updatedRows == null || !updatedRows.Any())
            {
                return BadRequest("Invalid data.");
            }

            string sqlQuery = @"
                WITH CTE AS (
                    SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNum
                    FROM [Reservdelar].[dbo].[UPricefileMANUAL]
                )
                UPDATE CTE
                SET 
                    DescrEng = {1}, Retail = {2}, Export = {3}, Prg = {4}, Disccode = {5}, 
                    DescrLoc = {6}, Origin = {7}, Wgt = {8}, Qnt = {9}, Qtfak1 = {10}, 
                    Qtfak2 = {11}, UnitType = {12}, ReplacingNo = {13}, Partgrp = {14}, 
                    StatofOrig = {15}, ArticleGroup = {16}, Replcode = {17}, [CORE kat] = {18}, 
                    CC = {19}, Custcode = {20}, Supplno = {21}, ValidFrom = {22}, 
                    DiscountCode = {23}
                WHERE RowNum = {0}";

            foreach (var row in updatedRows)
            {
                await _db.Database.ExecuteSqlCommandAsync(
                    sqlQuery,
                    row.Id, row.DescrEng, row.Retail, row.Export, row.Prg, row.Disccode,
                    row.DescrLoc, row.Origin, row.Wgt, row.Qnt, row.Qtfak1, row.Qtfak2,
                    row.UnitType, row.ReplacingNo, row.Partgrp, row.StatofOrig,
                    row.ArticleGroup, row.Replcode, row.CoreKat, row.CC,
                    row.Custcode, row.Supplno, row.ValidFrom, row.DiscountCode);
            }

            return Ok("Row updated successfully.");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UPricefileManual newRow)
        {
            if (newRow == null)
            {
                return BadRequest("Invalid data.");
            }

            _db.UPricefileManuals.Add(newRow);
            await _db.SaveChangesAsync();
            return Created($"api/UPricefileManual/{newRow.Artnr}", newRow);
        }
    }
}