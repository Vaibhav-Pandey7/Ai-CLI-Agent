function divide(a, b) {
    if (b === 0) {
        console.error("Error: Division by zero is not allowed.");
        return undefined;
    }
    return a / b;
}

function addItem(arr, item) {
    return [...arr, item];
}

function checkStatus(user) {
    return user && user.isActive && user.hasPermission && user.role === 'admin';
}

const ITEM_PRICE = 29.99;
function calculatePrice(quantity) {
    return quantity * ITEM_PRICE;
}

function loadData() {
    fetch('/api/data')
        .then(res => res.json())
        .catch(error => console.error("Error loading data:", error));
}