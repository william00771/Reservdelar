import { UPricefileManual, UPricefileManualResponseDto } from "../util/types";

const APIUrl = 'http://localhost:5089'

export async function getUPricefileManuals(): Promise<UPricefileManual[]> {
    const response = await fetch(`${APIUrl}/UPricefileManual`);

    if (!response.ok) {
        throw new Error("Failed to fetch UPricefileManual records!");
    }

    const jsonResponse: UPricefileManualResponseDto[] = await response.json();

    return jsonResponse.map((item, index) => ({
        Id: index + 1,
        ...item
    }));
}

export async function updateUPricefileManuals(updatedRows: UPricefileManual[]): Promise<void> {
    const response = await fetch(`${APIUrl}/UPricefileManual`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRows)
    });

    if (!response.ok) {
        throw new Error("Failed to update UPricefileManual records!");
    }
}