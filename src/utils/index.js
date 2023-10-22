export function replaceDecimalSeparator(number) {
    if (typeof number === 'string' && number.includes('.')) {
        const [integerPart, decimalPart] = number.split('.');
        if (decimalPart.length === 1) {
            return `${integerPart},${decimalPart}0`;
        } else if (decimalPart.length === 2) {
            return `${integerPart},${decimalPart}`;
        }
    } else if (typeof number === 'number') {
        return number.toFixed(2).replace('.', ',');
    }
    return number.toString();
}
