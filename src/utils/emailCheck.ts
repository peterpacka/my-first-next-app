export default function emailCheck(email: string) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regex
    if (emailRegex.test(email)) {
        return true; // Valid email format
    } else {
        return false; // Invalid email format
    }
}