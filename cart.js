// Initialize the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<tr><td colspan='6'>Your cart is empty</td></tr>";
        totalPriceContainer.textContent = '';
        return;
    }

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity; // Calculate subtotal for each item
        total += subtotal; // Add to total price

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button onclick="removeItem(${index})">Remove</button></td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>₹${subtotal.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalPriceContainer.textContent = `Total Price: ₹${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh cart display
}

// Function to update quantity and recalculate subtotal
function updateQuantity(index, quantity) {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    cart[index].quantity = parseInt(quantity, 10); // Update quantity
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh cart display
}

// Display cart items on page load
displayCartItems();



