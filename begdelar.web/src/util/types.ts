export type UPricefileManual = {
    Artnr: LimitedString<string, 22>;
    descrEng?: LimitedString<string, 30>;
    Retail?: LimitedString<string, 15>;
    Export?: LimitedString<string, 15>;
    prg?: LimitedString<string, 4>;
    disccode?: LimitedString<string, 5>;
    descrLoc?: LimitedString<string, 30>;
    Origin?: LimitedString<string, 3>;
    Wgt?: LimitedString<string, 10>;
    qnt?: LimitedString<string, 5>;
    qtfak1: LimitedString<string, 3>;
    qtfak2: LimitedString<string, 3>;
    unitType: LimitedString<string, 4>;
    ReplacingNo?: LimitedString<string, 22>;
    Partgrp?: LimitedString<string, 4>;
    statofOrig?: LimitedString<string, 1>;
    ArticleGroup?: LimitedString<string, 2>;
    replcode: LimitedString<string, 1>;
    "CORE kat"?: LimitedString<string, 1>;
    CC?: LimitedString<string, 1>;
    custcode?: LimitedString<string, 15>;
    supplno?: LimitedString<string, 10>;
    validFrom?: LimitedString<string, 8>;
    DiscountCode?: LimitedString<string, 1>;
  };  

type LimitedString<T extends string, L extends number> = T & { __maxLength: L };