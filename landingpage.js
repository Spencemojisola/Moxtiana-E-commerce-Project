// Cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Function to add item to cart
function addToCart(id, name, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
    } else {
        // If new item, add to cart
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCartDisplay();
    showAddToCartNotification(name);
}

// Function to remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

// Function to update item quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
        }
    }
}

// Function to update cart display
function updateCartDisplay() {
    // Update cart count
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    // Update cart total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = cartTotal.toLocaleString();

    // Update cart items display
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Price: N${item.price.toLocaleString()}</p>
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>Qty: ${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <p><strong>Subtotal: N${(item.price * item.quantity).toLocaleString()}</strong></p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    }
}

// Function to toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal.style.display === 'none' || cartModal.style.display === '') {
        cartModal.style.display = 'block';
    } else {
        cartModal.style.display = 'none';
    }
}

// Function to show add to cart notification
function showAddToCartNotification(itemName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${itemName} added to cart!`;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.display = 'block';
        notification.style.opacity = '1';
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function for checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert(`Checkout Total: N${cartTotal.toLocaleString()}\nRedirecting to payment...`);

}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('moxtiana-cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('moxtiana-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadCartFromStorage();
});

// Save cart whenever it's updated
window.addEventListener('beforeunload', function () {
    saveCartToStorage();
});