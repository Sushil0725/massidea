let cart = [];
let products = [
    { id: 1, name: "Content Creation", price: 0, description: "Enhance your brand with engaging blog posts, infographics, videos, podcasts, webinars, whitepapers, and social media content." },
    { id: 2, name: "Web Development", price: 0, description: "Build modern, responsive websites using HTML5, CSS3, JavaScript, Angular, jQuery, and Node.js for seamless user experiences." },
    { id: 3, name: "Office Suite", price: 0, description: "Streamline your workflow with tools for word processing, presentations, spreadsheets, and email management." },
    { id: 4, name: "Sales Proposal Templates", price: 0, description: "Impress clients with professionally designed templates featuring company introduction, solutions, and testimonials." },
    { id: 5, name: "Video Editing", price: 0, description: "Create stunning videos with our intuitive editing tools, perfect for crafting memorable and professional visual content." },
    { id: 6, name: "Photo Editing", price: 0, description: "Enhance your photos with intuitive tools for adjustments, filters, cropping, retouching, and red-eye removal." }
];

// Event delegation for Add to Cart button clicks
document.querySelector('.gallery').addEventListener('click', function(event) {
    if (event.target && event.target.matches('button.add-to-cart')) {
        const productId = parseInt(event.target.dataset.productId);
        const product = products.find(p => p.id === productId);
        addToCart(product.id, product.name, product.price);
    }
});

function addToCart(productId, productName, price) {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: productId, name: productName, price: price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            if (cart[i].quantity > 1) {
                cart[i].quantity--;
            } else {
                cart.splice(i, 1);
            }
            break;
        }
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cartList");
    const totalElement = document.getElementById("total");
    let cartContent = "";
    let total = 0;

    cartList.innerHTML = "";
    cart.forEach(item => {
        const productTotal = item.price * item.quantity;
        cartContent += `
            <li>
                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${productTotal.toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </li>`;
        total += productTotal;
    });
    cartList.innerHTML = cartContent;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function placeOrder() {
    cart = [];
    updateCart();
    document.getElementById("orderButton").style.display = "none";
    document.getElementById("orderConfirmation").style.display = "block";
}

function clearCart() {
    cart = [];
    updateCart();
}

function displayProducts() {
    const productHTML = products.map(product => `
        <div class="product">
            <img src="./photos/product_${product.id}.jpg" alt="Product Image">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>`
    ).join('');
    document.querySelector(".gallery").innerHTML = productHTML;
}

displayProducts(); // Display the products when the page loads
updateCart(); // Update the cart when the page loads

// Pagination
let currentPage = 1;
const productsPerPage = 3; // Adjust as needed

function displayProductsPerPage() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);
    const productHTML = productsToShow.map(product => `
        <div class="product">
            <img src="./photos/product_${product.id}.jpg" alt="Product Image">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>`
    ).join('');
    document.querySelector(".gallery").innerHTML = productHTML;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        document.getElementById("currentPage").textContent = currentPage;
        displayProductsPerPage();
    }
}

function nextPage() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        document.getElementById("currentPage").textContent = currentPage;
        displayProductsPerPage();
    }
}

function searchProducts() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery)
    );
    const productHTML = filteredProducts.map(product => `
        <div class="product">
            <img src="./photos/product_${product.id}.jpg" alt="Product Image">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>`
    ).join('');
    document.querySelector(".gallery").innerHTML = productHTML;
}
