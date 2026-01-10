// Product detail functionality
let currentProduct = {};
let selectedColor = '';
let selectedSize = '';
let quantity = 1;

// Load product details on page load
window.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    setupProductInteractions();
});

function loadProductDetails() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');
    const productCategory = urlParams.get('category') || 'Women';
    
    if (productId && productName && productPrice && productImage) {
        currentProduct = {
            id: productId,
            name: productName,
            price: parseInt(productPrice),
            image: decodeURIComponent(productImage),
            category: productCategory
        };
        
        // Update page content
        document.getElementById('product-title').textContent = productName;
        document.getElementById('product-price').textContent = `N${parseInt(productPrice).toLocaleString()}`;
        document.getElementById('main-product-image').src = decodeURIComponent(productImage);
        document.getElementById('product-name-breadcrumb').textContent = productName;
        document.getElementById('product-category').textContent = productCategory;
        
        //Thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.src = decodeURIComponent(productImage);
        });
        
        //Product description
        setProductDescription(productName);
        
        //Related products
        loadRelatedProducts();
    }
}

function setProductDescription(productName) {
    let description = '';
    
    if (productName.toLowerCase().includes('ankara')) {
        description = 'Beautiful Ankara roundneck design perfect for casual and semi-formal occasions. Made with high-quality African print fabric that is comfortable and durable. Available in multiple sizes and colors.';
    } else if (productName.toLowerCase().includes('bodysuit')) {
        description = 'Comfortable and stylish bodysuit perfect for layering or wearing alone. Made with stretchy, breathable fabric that fits perfectly. Ideal for both casual and dressy occasions.';
    } else if (productName.toLowerCase().includes('plus-size')) {
        description = 'Specially designed plus-size clothing that combines comfort with style. Made with premium fabrics and cut to flatter all body types. Available in extended sizes for the perfect fit.';
    } else {
        description = 'High-quality clothing item made with premium materials. Designed for comfort, style, and durability. Perfect addition to your wardrobe.';
    }
    
    document.getElementById('product-description-text').textContent = description;
}

function setupProductInteractions() {
    // Thumbnail click functionality
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.querySelector('.thumbnail.active').classList.remove('active');
            this.classList.add('active');
            document.getElementById('main-product-image').src = this.src;
        });
    });
    
    // Color selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.color-option.active').classList.remove('active');
            this.classList.add('active');
            selectedColor = this.dataset.color;
        });
    });
    
    // Size selection
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.size-option.active').classList.remove('active');
            this.classList.add('active');
            selectedSize = this.dataset.size;
        });
    });
    
    // Set default selections
    selectedColor = document.querySelector('.color-option.active').dataset.color;
    selectedSize = document.querySelector('.size-option.active').dataset.size;
}

function changeQuantity(change) {
    quantity += change;
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;
    document.getElementById('quantity').textContent = quantity;
}

// function addToCartFromDetail() {
//     if (currentProduct.id) {
//         // Use existing addToCart function from your main script
//         addToCart(
//             currentProduct.id,
//             currentProduct.name,
//             currentProduct.price,
//             currentProduct.image,
//             quantity,
//             selectedColor,
//             selectedSize
//         );
        
//         // Show confirmation
//         showNotification('Product added to cart!');
//     }
// }

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


function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.opacity = '1';
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function loadRelatedProducts() {
    // Sample related products (you can expand this with actual data)
    const relatedProducts = [
        {
            id: 'related1',
            name: 'Similar Ankara Design',
            price: 7500,
            image: './images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg'
        },
        {
            id: 'related2',
            name: 'Classic Roundneck',
            price: 8000,
            image: './images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg'
        },
        {
            id: 'related3',
            name: 'Designer Bodysuit',
            price: 6000,
            image: './images/c572c1e9-3c8e-4ba5-a006-67a8c9e43a55.jpg'
        }
    ];
    
    const container = document.getElementById('related-products-container');
    container.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'related-product-item';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p><strong>${product.name}</strong></p>
            <p>Price: N${product.price.toLocaleString()}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                Add to cart <i class="fa-solid fa-cart-shopping"></i>
            </button>
        `;
        container.appendChild(productElement);
    });
}


