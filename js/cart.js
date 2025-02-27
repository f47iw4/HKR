let cart = [];  // Initialize an empty cart


// Function to add a product to the cart
function addToCart(producto) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === producto.id);
    
    if (existingProduct) {
        // If the product is already in the cart, increase the quantity
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product to the cart with quantity 1
        producto.quantity = 1;
        cart.push(producto);
    }

    console.log(cart);  // Log the cart to check if products are added
    updateCartDisplay();  // Update the cart display when a product is added
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";  // Clear the cart display

    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h5>${item.nombre}</h5>
                <p>${item.precio}€</p>
                <p>Cantidad: ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItem);
        });
    } else {
        cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    }
}

// Function to open the cart modal
document.getElementById("imgCarrito").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "block";  // Show the cart modal
    updateCartDisplay();  // Update the cart contents
});

// Function to close the cart modal
document.getElementById("close-cart").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "none";  // Hide the cart modal
});
