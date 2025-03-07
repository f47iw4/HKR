document.addEventListener("DOMContentLoaded", function () {
    let productos = []; // almacena los productos cargados del JSON
    const container = document.getElementById("container");
    let cart = [];  // Inicializamos un carrito vacío


    function addToCart(producto) {
        const existingProduct = cart.find(item => item.id === producto.id);

        if (existingProduct) {

            existingProduct.quantity++;
        } else {

            producto.quantity = 1;
            cart.push(producto);
        }

        updateCartDisplay();  
    }

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


    document.getElementById("imgCarrito").addEventListener("click", function () {
        document.getElementById("cart-modal").style.display = "block";  
        updateCartDisplay();  
    });


    document.getElementById("close-cart").addEventListener("click", function () {
        document.getElementById("cart-modal").style.display = "none";  // Hide the cart modal
    });

    
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
                    addToCart(producto);  // añade al carrito al clicar
                });
    
                container.appendChild(card);
            });
        } else {
            container.innerHTML = `<p class="text-center w-100">No se encontraron productos.</p>`;
        }
    }
    
     //carga los productos desde la api desplegada 

    fetch("https://hkr-api-production.up.railway.app/api/productos/") 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        return response.json();
    })
    .then(datos => {
        productos = datos;
        mostrarProductos(productos);  
    })
    .catch(error => console.error("Error al cargar los productos:", error)); 
    
    
    /* carga los productos desde la api 

    fetch("http://localhost:8001/api/productos/") 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        return response.json();
    })
    .then(datos => {
        productos = datos;
        mostrarProductos(productos);  
    })
    .catch(error => console.error("Error al cargar los productos:", error)); 
    
    /*

    /*carga los productos desde el json productos
    fetch("data/productos.json")
        .then(response => response.json())
        .then(datos => {
            productos = datos;
            mostrarProductos(productos);  
        })
        .catch(error => console.error("Error al cargar los productos:", error));
    */
    // funcionalidad de busqueda (barra)
    document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("searchInput").value.toLowerCase().trim();

        if (query === "") {
            mostrarProductos(productos);  
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

    // busca categorias navbar 
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

            mostrarProductos(resultados); //filtra por ctegoria
        });
    });

    // funcionalidad de busqueda por voz 
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
                    mostrarProductos(productos);  
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
