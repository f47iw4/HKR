document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
       e.preventDefault(); 

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const contrasenia = document.getElementById("contrasenia").value;
        const contraseniaRepetida = document.getElementById("contraseniaRepetida").value;
        const cumpleanos = document.getElementById("cumpleanos").value;

        // Expresiones Regulares
        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/;
        const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        const regexContrasenia = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // valida no campos vacíos
        if (!nombre || !apellidos || !email || !contrasenia || !contraseniaRepetida || !cumpleanos) {
            alert("Por favor, completa todos los campos.");
            return;
        }

     
        if (!regexNombre.test(nombre) || !regexNombre.test(apellidos)) {
            alert("El nombre y los apellidos solo pueden contener letras y espacios, mínimo 2 caracteres.");
            return;
        }


        if (!regexEmail.test(email)) {
            alert("Por favor, introduce un email válido.");
            return;
        }

        if (!regexContrasenia.test(contrasenia)) {
            alert("La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.");
            return;
        }

        // coincidencia de contraseñas
        if (contrasenia !== contraseniaRepetida) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        //fecha valida de nacimiento
        const fechaNacimiento = new Date(cumpleanos);
        if (isNaN(fechaNacimiento.getTime())) {
            alert("Por favor, introduce una fecha de nacimiento válida.");
            return;
        }

        // mira si el usuario ya está registrado
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuariosGuardados.find(usuario => usuario.email === email);

        if (usuarioExistente) {
            alert("Este correo ya está registrado.");
            return;
        }

        //tiene q guardar en localStorage antes de ir al login    
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
        alert("¡Ya estás con nosotros!");
        form.reset();         
        window.location.href = "login.html"; 

    });
});
