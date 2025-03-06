const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CHARSET_LENGTH = CHARSET.length;

/**
 * Generates the next PO number based on the given latest PO number and combination count.
 * @param currentPoNumber The latest PO number
 * @param combinationCount The number of digits for the PO number
 * @returns The next PO number in the sequence
 */
export function generateNumberCombination(
    latestCombination: string,
    combinationCount: number
): string {
    if (combinationCount <= 0) {
        throw new Error("Combination count must be greater than zero.");
    }

    // If currentPoNumber is empty, start with the initial combination
    if (latestCombination === "") {
        return CHARSET[0].repeat(combinationCount);
    }

    const poArray = latestCombination.padStart(combinationCount, CHARSET[0]).split("");

    // Traverse from the last character backward to find where to increment
    for (let i = poArray.length - 1; i >= 0; i--) {
        const currentIndex = CHARSET.indexOf(poArray[i]);
        if (currentIndex < CHARSET_LENGTH - 1) {
            // Increment character
            poArray[i] = CHARSET[currentIndex + 1];
            // Reset all characters to 'A' after this position
            for (let j = i + 1; j < poArray.length; j++) {
                poArray[j] = CHARSET[0];
            }
            return poArray.join("");
        }
    }

    // If all characters are at the maximum, return overflow value
    return CHARSET[0].repeat(combinationCount + 1);
}