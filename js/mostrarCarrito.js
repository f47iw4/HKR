document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        mostrarCarrito();
    });
});

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        listaCarrito.appendChild(item);
    });
}
