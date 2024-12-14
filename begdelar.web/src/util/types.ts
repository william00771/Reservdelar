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
    Artnr: { maxLength: 22, nullable: false },
    descrEng: { maxLength: 30, nullable: true },
    Retail: { maxLength: 15, nullable: true },
    Export: { maxLength: 15, nullable: true },
    prg: { maxLength: 4, nullable: true },
    disccode: { maxLength: 5, nullable: true },
    descrLoc: { maxLength: 30, nullable: true },
    Origin: { maxLength: 3, nullable: true },
    Wgt: { maxLength: 10, nullable: true },
    qnt: { maxLength: 5, nullable: true },
    qtfak1: { maxLength: 3, nullable: false },
    qtfak2: { maxLength: 3, nullable: true },
    unitType: { maxLength: 4, nullable: false },
    ReplacingNo: { maxLength: 22, nullable: true },
    Partgrp: { maxLength: 4, nullable: true },
    statofOrig: { maxLength: 1, nullable: true },
    ArticleGroup: { maxLength: 2, nullable: true },
    replcode: { maxLength: 1, nullable: false },
    "CORE kat": { maxLength: 1, nullable: true },
    CC: { maxLength: 1, nullable: true },
    custcode: { maxLength: 15, nullable: true },
    supplno: { maxLength: 10, nullable: true },
    validFrom: { maxLength: 8, nullable: true },
    DiscountCode: { maxLength: 1, nullable: true },
};

type ValidationRule = {
    maxLength: number;
    nullable: boolean;
};
  
type UPricefileManualValidation = {
    [K in keyof UPricefileManual]: ValidationRule;
};