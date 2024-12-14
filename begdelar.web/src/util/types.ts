export type UPricefileManual = {
    Artnr: string;
    descrEng?: string;
    Retail?: string;
    Export?: string;
    prg?: string;
    disccode?: string;
    descrLoc?: string;
    Origin?: string;
    Wgt?: string;
    qnt?: string;
    qtfak1: string;
    qtfak2: string;
    unitType: string;
    ReplacingNo?: string;
    Partgrp?: string;
    statofOrig?: string;
    ArticleGroup?: string;
    replcode: string;
    "CORE kat"?: string;
    CC?: string;
    custcode?: string;
    supplno?: string;
    validFrom?: string;
    DiscountCode?: string;
};

export const UPricefileManualValidationObject: UPricefileManualValidation = {
    Artnr: { maxLength: 22 },
    descrEng: { maxLength: 30 },
    Retail: { maxLength: 15 },
    Export: { maxLength: 15 },
    prg: { maxLength: 4 },
    disccode: { maxLength: 5 },
    descrLoc: { maxLength: 30 },
    Origin: { maxLength: 3 },
    Wgt: { maxLength: 10 },
    qnt: { maxLength: 5 },
    qtfak1: { maxLength: 3 },
    qtfak2: { maxLength: 3 },
    unitType: { maxLength: 4 },
    ReplacingNo: { maxLength: 22 },
    Partgrp: { maxLength: 4 },
    statofOrig: { maxLength: 1 },
    ArticleGroup: { maxLength: 2 },
    replcode: { maxLength: 1 },
    "CORE kat": { maxLength: 1 },
    CC: { maxLength: 1 },
    custcode: { maxLength: 15 },
    supplno: { maxLength: 10 },
    validFrom: { maxLength: 8 },
    DiscountCode: { maxLength: 1 },
};

type ValidationRule = {
    maxLength: number;
};
  
type UPricefileManualValidation = {
    [K in keyof UPricefileManual]: ValidationRule;
};