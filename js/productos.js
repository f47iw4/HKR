document.addEventListener("DOMContentLoaded", () => {
    // selecciona el contenedor donde se insertan los productos
    const container = document.getElementById("product-container");

    // carga el JSON 
    fetch("data/productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }
            return response.json(); // Convertir la respuesta en JSON
        })
        .then(productos => {
            // Recorrer los productos y generar el HTML
            productos.forEach(producto => {
                const productHTML = `
                    <div class="col-md-3">
                        <div class="product-card">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <h5>${producto.nombre}</h5>
                            <p><strong>$${producto.precio.toFixed(2)}</strong></p>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                `;
                container.innerHTML += productHTML;
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});