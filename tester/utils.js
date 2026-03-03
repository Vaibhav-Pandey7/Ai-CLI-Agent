// Added input validation (BUG FIX)
function divide(a, b) {
    if (b === 0) {
        console.error("Error: Division by zero is not allowed.");
        return undefined; // Or throw an error
    }
    return a / b;
}

// Returns a new array to avoid mutating the original (CODE QUALITY)
function addItem(arr, item) {
    return [...arr, item];
}

// Refactored complex nested conditions (CODE QUALITY)
function checkStatus(user) {
    return user && user.isActive && user.hasPermission && user.role === 'admin';
}

// Used a named constant for clarity (CODE QUALITY)
const ITEM_PRICE = 29.99;
function calculatePrice(quantity) {
    return quantity * ITEM_PRICE;
}

// Added error handling for promise (BUG FIX)
function loadData() {
    fetch('/api/data')
        .then(res => res.json())
        .catch(error => console.error("Error loading data:", error));
}