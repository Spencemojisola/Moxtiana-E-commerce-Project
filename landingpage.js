// Product data
const products = [
    {
        id: 1,
        name: "Ankara Roundneck",
        description: "Ankara Roundneck",
        category: "women",
        color: "Ankara pattern",
        size: "M-2XL",
        price: 8500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["ankara", "roundneck", "women", "shirt", "traditional", "african"]
    },
    {
        id: 2,
        name: "Plus-size Roundneck",
        description: "Plus-size Roundneck",
        category: "women",
        color: "Black, White, Coffee brown",
        size: "3XL-5XL",
        price: 9500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["plus-size", "roundneck", "women", "shirt", "large", "big"]
    },
    {
        id: 3,
        name: "Bodysuits",
        description: "Bodysuits",
        category: "women",
        color: "Black, White, Coffee brown",
        size: "6-18",
        price: 6500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["bodysuit", "women", "fitted", "body", "suit"]
    },
    {
        id: 4,
        name: "Men's Ankara Roundneck",
        description: "Ankara Roundneck for Men",
        category: "men",
        color: "Black, White, Coffee brown",
        size: "S-5XL",
        price: 8500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["ankara", "roundneck", "men", "shirt", "traditional", "african", "male"]
    },
    {
        id: 5,
        name: "Men's Plus-size Roundneck",
        description: "Plus-size Roundneck for Men",
        category: "men",
        color: "Black, White, Coffee brown",
        size: "2XL-5XL",
        price: 9500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["plus-size", "roundneck", "men", "shirt", "large", "big", "male"]
    },
    {
        id: 6,
        name: "Men's Bodysuits",
        description: "Bodysuits for Men",
        category: "men",
        color: "Black, White, Coffee brown",
        size: "6-18",
        price: 6500,
        image: "./images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg",
        keywords: ["bodysuit", "men", "fitted", "body", "suit", "male"]
    }
];

// Search functionality
function searchProducts(query) {
    if (!query || query.trim() === '') {
        return products;
    }

    const searchTerm = query.toLowerCase().trim();

    return products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.color.toLowerCase().includes(searchTerm) ||
            product.size.toLowerCase().includes(searchTerm) ||
            product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
        );
    });
}

// Display the search results
function displaySearchResults(results, query) {
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsSection = document.getElementById('search-results');

    if (results.length === 0) {
        searchResultsContainer.innerHTML = `
            <div class="no-results">
                <p>No products found for "${query}"</p>
                <p>Try searching for: ankara, roundneck, bodysuit, plus-size, men, women</p>
            </div>
        `;
    } else {
        searchResultsContainer.innerHTML = results.map(product => `
            <a href="#" class="product-item search-result-item" 
               data-id="${product.id}" 
               data-name="${product.name}" 
               data-price="${product.price}"
               data-image="${product.image}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p><strong>${product.name}</strong></p>
                    <p>Description: ${product.description}</p>
                    <p>Color: ${product.color}</p>
                    <p>Size: ${product.size}</p>
                    <p>Price: N${product.price.toLocaleString()}</p>
                    <button class="add-to-cart-btn"
                        onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                        Add to cart <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </a>
        `).join('');
    }

    // Show search results and hide original product sections
    searchResultsSection.style.display = 'block';
    hideOriginalProducts();

    // Scroll to results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Hide original product sections
function hideOriginalProducts() {
    const womenSection = document.querySelector('.womendesigns');
    const menSection = document.querySelector('.mendesigns');
    const womenTitle = document.querySelector('.shopwomendesigns');
    const menTitle = document.querySelector('.shopmendesigns');

    if (womenSection) womenSection.style.display = 'none';
    if (menSection) menSection.style.display = 'none';
    if (womenTitle) womenTitle.style.display = 'none';
    if (menTitle) menTitle.style.display = 'none';
}

// Show original product sections
function showOriginalProducts() {
    const womenSection = document.querySelector('.womendesigns');
    const menSection = document.querySelector('.mendesigns');
    const womenTitle = document.querySelector('.shopwomendesigns');
    const menTitle = document.querySelector('.shopmendesigns');

    if (womenSection) womenSection.style.display = 'block';
    if (menSection) menSection.style.display = 'block';
    if (womenTitle) womenTitle.style.display = 'block';
    if (menTitle) menTitle.style.display = 'block';
}

// Clear search and show all products
function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.value = '';
    searchResults.style.display = 'none';
    showOriginalProducts();
}

// Handle search execution
function executeSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query === '') {
        clearSearch();
        return;
    }

    const results = searchProducts(query);
    displaySearchResults(results, query);
}

// Event listeners for search
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', executeSearch);
    }

    // Enter key press in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }
});

// filter by category
function filterByCategory(category) {
    const results = products.filter(product => product.category === category);
    displaySearchResults(results, category + ' products');
}

//click for category navigation
document.addEventListener('DOMContentLoaded', function () {
    const womenNav = document.querySelector('.logoside p:nth-child(2)'); // WOMEN
    const menNav = document.querySelector('.logoside p:nth-child(3)'); // MEN

    if (womenNav) {
        womenNav.style.cursor = 'pointer';
        womenNav.addEventListener('click', () => filterByCategory('women'));
    }

    if (menNav) {
        menNav.style.cursor = 'pointer';
        menNav.addEventListener('click', () => filterByCategory('men'));
    }
});

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

