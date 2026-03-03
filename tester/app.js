// Consider loading API_KEY from environment variables or a secure configuration service
const API_KEY = "YOUR_API_KEY_HERE";

function getUserName(user) {
    if (!user || !user.name) {
        return "UNKNOWN";
    }
    return user.name.toUpperCase();
}

function runCode(code) {
    // Avoid using eval() as it can execute malicious code.
    // Consider alternative safe methods for dynamic code execution if truly necessary.
}

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
        return null;
    }
}

function calculateTotal(a, b) {
    const sum = a + b;
    return sum;
}

function displayMessage(userInput) {
    document.getElementById('message').textContent = userInput;
}

function compare(a, b) {
    if (a === b) {
        return true;
    }
    return false;
}

async function getData() {
    await fetchData();
    console.log("Done");
}

function generateToken() {
    // Math.random() is not cryptographically secure.
    // For security-sensitive tokens, use a cryptographically strong random number generator.
    return "secure_token_placeholder";
}