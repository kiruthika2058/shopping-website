// Initialize an empty cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all cart images
const cartImages = document.querySelectorAll('.cart-image');
cartImages.forEach(image => {
    image.addEventListener('click', addToCart);
});

// Function to add item to cart
function addToCart(event) {
    const productName = event.target.getAttribute('data-name');
    const productPrice = event.target.getAttribute('data-price');
    const productImage = event.target.getAttribute('data-image'); // Get the image source

    // Add the product to the cart array
    cart.push({ name: productName, price: productPrice, image: productImage });

    // Save the cart array to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count in the navbar
    document.getElementById('cart-count').textContent = cart.length;

    alert(`${productName} has been added to the cart!`);
}

// Display cart items when the cart icon in the navbar is clicked
const cartIcon = document.querySelector('.bx-cart');
cartIcon.addEventListener('click', showCart);

// Function to display cart items in the cart section
function showCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cartSection = document.getElementById('cart');
    
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0; // To calculate total price

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        cartSection.style.display = 'block'; // Show cart section
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        // Create image element
        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.style.width = '50px';
        itemImage.style.marginRight = '10px';

        // Create name and price text
        const itemText = document.createElement('p');
        itemText.textContent = `${item.name} - ₹${item.price}`;

        // Append image and text to the item div
        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemText);

        // Append the item div to the cart items container
        cartItemsContainer.appendChild(itemDiv);

        // Update the total price
        total += parseFloat(item.price);
    });

    // Display the total price
    totalPriceContainer.textContent = `Total Price: ₹${total.toFixed(2)}`;

    // Show the cart section
    cartSection.style.display = 'block';
}

// Update the cart count when the page loads (if items were already added)
document.getElementById('cart-count').textContent = cart.length;
