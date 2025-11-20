// Product List
const products = [
    {
        name: "Organic Rice",
        price: 45,
        unit: "₹ / Kg",
        image: "images/rice.jpg"
    },
    {
        name: "Organic Tomato",
        price: 10,
        unit: "₹ / Kg",
        image: "images/tomato.jpg"
    },
    {
        name: "Organic Potato",
        price: 15,
        unit: "₹ / Kg",
        image: "images/potato.jpg"
    }
];

// Display Products on the Products Page
const productsGrid = document.getElementById("products-grid");

if (productsGrid) {
    products.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} ${product.unit}</p>
                <button onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
        `;
        productsGrid.innerHTML += card;
    });
}

// Add product to cart
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(p => p.name === productName);

    // If already in cart → increase quantity
    const existing = cart.find(item => item.name === productName);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);

    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.textContent = count;
}

// Run on page load
updateCartCount();
