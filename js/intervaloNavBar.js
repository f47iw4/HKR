    // los textos que se van a mostrar
    const textos = [
        "🌸 bienvenid@ a hikari 🌸",
        "🎉 ofertas especiales disponibles 🎉",
        "🛍 nueva colección ya en línea 🛍",
        "🌟 ¡gracias por visitar nuestro sitio! 🌟",
        "📞 contáctanos para más detalles 📞"
      ];
  
      // índice actual del texto
      let index = 0;
  
      // Funcion q cambia el texto de la navbar cada x tiempo 
      function cambiarTexto() {
        const navbarText = document.getElementById("navbar-text");
        navbarText.innerHTML = textos[index];
  
        // incrementa el índice y vuelve a 0 si llega al final del array
        index = (index + 1) % textos.length;
      }
  
      // cambia el texto cada 2 segundos y medio
      setInterval(cambiarTexto, 2500);