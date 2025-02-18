document.addEventListener("DOMContentLoaded", function () {
    fetch("data/productos.json")
      .then(response => response.json())
      .then(datos => {
        const container = document.getElementById("productos-container");

        datos.forEach(producto => {
          const card = document.createElement("div");
          card.classList.add("col-md-3");

          card.innerHTML = `
            <div class="card">
              <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.precio}</p>
                <button class="btn btn-primary">Comprar</button>
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => console.error("Error al cargar los productos:", error));
  });