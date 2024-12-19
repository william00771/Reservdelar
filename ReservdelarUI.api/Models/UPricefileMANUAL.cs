using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReservdelarUI.api.Models
{
    public class UPricefileManual
    {
        [Required, MaxLength(22)]
        public required string Artnr { get; set; }

        [MaxLength(30)]
        public string? DescrEng { get; set; }

        [MaxLength(15)]
        public string? Retail { get; set; }

        [MaxLength(15)]
        public string? Export { get; set; }

        [MaxLength(4)]
        public string? Prg { get; set; }

        [MaxLength(5)]
        public string? Disccode { get; set; }

        [MaxLength(30)]
        public string? DescrLoc { get; set; }

        [MaxLength(3)]
        public string? Origin { get; set; }

        [MaxLength(10)]
        public string? Wgt { get; set; }

        [MaxLength(5)]
        public string? Qnt { get; set; }

        [Required, MaxLength(3)]
        public required string Qtfak1 { get; set; }

        [MaxLength(3)]
        public string? Qtfak2 { get; set; }

        [Required, MaxLength(4)]
        public required string UnitType { get; set; }

        [MaxLength(22)]
        public string? ReplacingNo { get; set; }

        [MaxLength(4)]
        public string? Partgrp { get; set; }

        [MaxLength(1)]
        public string? StatofOrig { get; set; }

        [MaxLength(2)]
        public string? ArticleGroup { get; set; }

        [Required, MaxLength(1)]
        public required string Replcode { get; set; }

        [MaxLength(1)]
        [Column("CORE kat")]
        public string? CoreKat { get; set; }

        [MaxLength(1)]
        public string? CC { get; set; }

        [MaxLength(15)]
        public string? Custcode { get; set; }

        [MaxLength(10)]
        public string? Supplno { get; set; }

        [MaxLength(8)]
        public string? ValidFrom { get; set; }

        [MaxLength(1)]
        public string? DiscountCode { get; set; }
    }
}