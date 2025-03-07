import { cargarProductos } from "./productos.js";
import { agregarAlCarrito } from "./.carrito.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    agregarAlCarrito();
});
