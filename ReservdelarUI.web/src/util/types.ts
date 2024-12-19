export type UPricefileManual = {
    Id: number;
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
    coreKat?: string;
    CC?: string;
    custcode?: string;
    supplno?: string;
    validFrom?: string;
    DiscountCode?: string;
};

export type UPricefileManualResponseDto = {
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
    coreKat?: string;
    CC?: string;
    custcode?: string;
    supplno?: string;
    validFrom?: string;
    DiscountCode?: string;
};

export const UPricefileManualValidationObject: UPricefileManualValidation = {
    Id: {maxLength: 10, nullable: false},
    //@ts-ignore - For the type to find the validationkey the key has to begin with lowercase letter (for some reason)
    artnr: { maxLength: 22, nullable: false },
    descrEng: { maxLength: 30, nullable: true },
    retail: { maxLength: 15, nullable: true },
    export: { maxLength: 15, nullable: true },
    prg: { maxLength: 4, nullable: true },
    disccode: { maxLength: 5, nullable: true },
    descrLoc: { maxLength: 30, nullable: true },
    origin: { maxLength: 3, nullable: true },
    wgt: { maxLength: 10, nullable: true },
    qnt: { maxLength: 5, nullable: true },
    qtfak1: { maxLength: 3, nullable: false },
    qtfak2: { maxLength: 3, nullable: true },
    unitType: { maxLength: 4, nullable: true },
    replacingNo: { maxLength: 22, nullable: true },
    partgrp: { maxLength: 4, nullable: true },
    statofOrig: { maxLength: 1, nullable: true },
    articleGroup: { maxLength: 2, nullable: true },
    replcode: { maxLength: 1, nullable: false },
    coreKat: { maxLength: 1, nullable: true },
    cc: { maxLength: 1, nullable: true },
    custcode: { maxLength: 15, nullable: true },
    supplno: { maxLength: 10, nullable: true },
    validFrom: { maxLength: 8, nullable: true },
    discountCode: { maxLength: 1, nullable: true },
};

type ValidationRule = {
    maxLength: number;
    nullable: boolean;
};
  
type UPricefileManualValidation = {
    [K in keyof UPricefileManual]: ValidationRule;
};