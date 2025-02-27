function anadirAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(e => e.nombre === producto.nombre);

    if (productoExistente) {
        // Si ya está, aumentar la cantidad sin exceder el stock
        productoExistente.cantidad += cantidad;
        if (productoExistente.cantidad > producto.stock) {
            alert("No hay stock suficiente. La cantidad máxima es " + producto.stock);
            productoExistente.cantidad = producto.stock;
        }
    } else {
        // Si no está, agregarlo al carrito
        carrito.push({
            nombre: producto.nombre,
            cantidad: cantidad,
        });
    }

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    console.log("Producto añadido:", producto.nombre, cantidad);
}

// **Actualizar el carrito dentro del dropdown**
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito-container");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Limpiar antes de actualizar
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<li class='text-muted'>El carrito está vacío</li>";
    } else {
        carrito.forEach((item, index) => {
            contenedorCarrito.innerHTML += `
                <li class="d-flex justify-content-between align-items-center py-2">
                    <span>${item.nombre} - ${item.cantidad} uds</span>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.nombre}')">X</button>
                </li>
            `;
        });
    }

    // Actualizar el contador en el botón del carrito
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = `(${carrito.reduce((acc, item) => acc + item.cantidad, 0)})`;
}

// **Eliminar un producto del carrito**
function eliminarDelCarrito(nombre) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// **Vaciar el carrito**
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

// **Cargar el carrito al iniciar la página**
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
});
