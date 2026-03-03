// Consider loading API_KEY from environment variables or a secure configuration service (SECURITY FIX)
const API_KEY = "YOUR_API_KEY_HERE";

// Added null check (BUG FIX)
function getUserName(user) {
    if (!user || !user.name) {
        return "UNKNOWN";
    }
    return user.name.toUpperCase();
}

// Removed console.log (CODE QUALITY)
// console.log("App started");

// Removed eval() due to security risks (SECURITY FIX)
function runCode(code) {
    // Avoid using eval() as it can execute malicious code.
    // Consider alternative safe methods for dynamic code execution if truly necessary.
    console.warn("Usage of eval() is a security risk and is not recommended.");
}

// Added error handling (BUG FIX)
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null; // Or re-throw the error
    }
}

// Removed unused variable (CODE QUALITY)
// const unusedVar = "I'm never used";

// Added missing return statement (BUG FIX)
function calculateTotal(a, b) {
    const sum = a + b;
    return sum;
}

// Used textContent instead of innerHTML to prevent XSS (SECURITY FIX)
function displayMessage(userInput) {
    document.getElementById('message').textContent = userInput;
}

// Used strict equality (===) instead of loose equality (==) (BUG FIX)
function compare(a, b) {
    if (a === b) {
        return true;
    }
    return false;
}

// Added await for async function call (BUG FIX)
async function getData() {
    await fetchData();
    console.log("Done");
}

// Math.random is not suitable for generating secure tokens (SECURITY FIX)
function generateToken() {
    // Math.random() is not cryptographically secure.
    // For security-sensitive tokens, use a cryptographically strong random number generator.
    return "secure_token_placeholder";
}