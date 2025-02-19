document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll("#agregar-carrito");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const producto = e.target.closest(".producto");
            const id = producto.dataset.id;
            const nombre = producto.dataset.nombre;
            const precio = parseFloat(producto.dataset.precio);

            agregarAlCarrito({ id, nombre, precio });
        });
    });
});

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verifica si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito");
}
