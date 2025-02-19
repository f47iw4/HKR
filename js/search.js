document.addEventListener("DOMContentLoaded", function () {
    let productos = []; // almacena los productos cargados del JSON
    const container = document.getElementById("productos-container");

    // función que renderiza los productos hacia el contenedor
    function mostrarProductos(lista) {
        container.innerHTML = ""; // Limpiar antes de agregar nuevos productos
        if (lista.length > 0) {
            lista.forEach(producto => {
                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4");
                card.innerHTML = `
                    <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.precio}</p>
                            <button class="btn-beige">añadir</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = `<p class="text-center w-100">No se encontraron productos.</p>`;
        }
    }

    // carga los productos desde el JSON
    fetch("data/productos.json")
        .then(response => response.json())
        .then(datos => {
            productos = datos;
            mostrarProductos(productos); // Mostrar todos los productos inicialmente
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    // Búsqueda por texto
    document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("searchInput").value.toLowerCase().trim();

        if (query === "") {
            mostrarProductos(productos); // Si la búsqueda está vacía, muestra todos los productos
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

    // Búsqueda por clic en la navbar
    const categoriaLinks = document.querySelectorAll(".nav-link");
    categoriaLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto de los enlaces
            const categoriaSeleccionada = this.getAttribute("data-categoria").toLowerCase(); // Obtener la categoría

            const resultados = productos.filter(p => 
                p.categoria.toLowerCase() === categoriaSeleccionada ||
                p.nombre.toLowerCase().includes(categoriaSeleccionada) || // Extra: búsqueda por nombre
                p.descripcion.toLowerCase().includes(categoriaSeleccionada) || // Extra: búsqueda por descripción
                p.material.toLowerCase().includes(categoriaSeleccionada) // Extra: búsqueda por material
            );

            mostrarProductos(resultados); // Mostrar los productos filtrados por la categoría
        });
    });

    // Búsqueda por voz (opcional)
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
                    mostrarProductos(productos); // Si la búsqueda está vacía, muestra todos los productos
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
