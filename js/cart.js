let cart = [];  // inicializa la cesta vacia


// añade producto a la cesta
function addToCart(producto) {
    // Comprueba si esta ya en la cesta
    const existingProduct = cart.find(item => item.id === producto.id);
    
    if (existingProduct) {
        // si ya está en la cesta incrementa la cantidad 
        existingProduct.quantity++;
    } else {
        // sino, añade a la cesta con cantidad 1
        producto.quantity = 1;
        cart.push(producto);
    }

    console.log(cart);  
    updateCartDisplay();  
}

// actualiza el display del cart
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";  

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

// abre modal del carrito
document.getElementById("imgCarrito").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "block";  // Show the cart modal
    updateCartDisplay();  // Update the cart contents
});

// cierra modal del carrito
document.getElementById("close-cart").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "none";  // Hide the cart modal
});
