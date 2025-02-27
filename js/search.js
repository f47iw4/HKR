document.addEventListener("DOMContentLoaded", function () {
    let productos = []; // almacena los productos cargados del JSON
    const container = document.getElementById("container");
    let cart = [];  // Inicializamos un carrito vacío

    // Function to add products to the cart
    function addToCart(producto) {
        const existingProduct = cart.find(item => item.id === producto.id);

        if (existingProduct) {
            // If the product is already in the cart, increase the quantity
            existingProduct.quantity++;
        } else {
            // Otherwise, add the product with quantity 1
            producto.quantity = 1;
            cart.push(producto);
        }

        updateCartDisplay();  // Update the cart display
    }

    // Function to update the cart modal display
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

    // Open cart modal
    document.getElementById("imgCarrito").addEventListener("click", function () {
        document.getElementById("cart-modal").style.display = "block";  // Show the cart modal
        updateCartDisplay();  // Update the cart contents
    });

    // Close cart modal
    document.getElementById("close-cart").addEventListener("click", function () {
        document.getElementById("cart-modal").style.display = "none";  // Hide the cart modal
    });

    // Function to render products
    function mostrarProductos(lista) {
        const container = document.getElementById("productos-container"); 
        container.innerHTML = ""; 
    
        if (lista.length > 0) {
            lista.forEach(producto => {
                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4");
                card.innerHTML = `
                    <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.precio}€</p>
                            <button class="btn boton-agregado" data-id="${producto.id}">Añadir</button>
                        </div>
                    </div>
                `;
    
                const addButton = card.querySelector(".boton-agregado");
                addButton.addEventListener("click", function () {
                    addToCart(producto);  // Add the product to the cart when clicked
                });
    
                container.appendChild(card);
            });
        } else {
            container.innerHTML = `<p class="text-center w-100">No se encontraron productos.</p>`;
        }
    }
    

    // Load products from JSON
    fetch("data/productos.json")
        .then(response => response.json())
        .then(datos => {
            productos = datos;
            mostrarProductos(productos);  // Display products when loaded
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    // Search functionality (text search)
    document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("searchInput").value.toLowerCase().trim();

        if (query === "") {
            mostrarProductos(productos);  // Show all products if search is empty
        } else {
            const resultados = productos.filter(p => 
                p.categoria.toLowerCase().includes(query) ||
                p.nombre.toLowerCase().includes(query) ||
                p.descripcion.toLowerCase().includes(query) ||
                p.material.toLowerCase().includes(query)
            );
            mostrarProductos(resultados);
        }
    });

    // Category search by navbar
    const categoriaLinks = document.querySelectorAll(".nav-link");
    categoriaLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); 
            const categoriaSeleccionada = this.getAttribute("data-categoria").toLowerCase(); // Get category

            const resultados = productos.filter(p => 
                p.categoria.toLowerCase() === categoriaSeleccionada ||
                p.nombre.toLowerCase().includes(categoriaSeleccionada) || 
                p.descripcion.toLowerCase().includes(categoriaSeleccionada) || 
                p.material.toLowerCase().includes(categoriaSeleccionada) 
            );

            mostrarProductos(resultados); // Show filtered products by category
        });
    });

    // Voice search functionality
    document.getElementById("voiceInput").addEventListener("click", function () {
        if ("webkitSpeechRecognition" in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = "es-ES";
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById("searchInput").value = transcript;
                const query = transcript.toLowerCase().trim();

                if (query === "") {
                    mostrarProductos(productos);  // Show all products if search is empty
                } else {
                    const resultados = productos.filter(p => 
                        p.categoria.toLowerCase().includes(query) ||
                        p.nombre.toLowerCase().includes(query) ||
                        p.descripcion.toLowerCase().includes(query) ||
                        p.material.toLowerCase().includes(query)
                    );
                    mostrarProductos(resultados);
                }
            };
            recognition.start();
        } else {
            alert("Tu navegador no soporta la búsqueda por voz.");
        }
    });
});
