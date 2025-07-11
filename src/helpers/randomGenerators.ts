// Generates a random email in the format email{randomtext}@hotmail.com
export function generateRandomEmail(): string {
    const randomText = Math.random().toString(36).substring(2, 10); // 8 random alphanumeric chars
    return `email${randomText}@hotmail.com`;
}

// Generates a random UK phone number in the format 07{9 digits}
export function generateRandomPhoneNumber(): string {
    let number = '07';
    for (let i = 0; i < 9; i++) {
        number += Math.floor(Math.random() * 10).toString();
    }
    return number;
}
