/*Validar direccion de email*/

function validarEmail() {
    var email = document.getElementById('email').value;
    var emailError = document.getElementById('emailError');
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // si es válido
    if (regex.test(email)) {
        emailError.style.display = 'none'; // si falla no se enseña
        successModal.show(); 
        setTimeout(() => {
            // cerrar el modal de éxito después de 2 segundos
            var subscribeModal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
            subscribeModal.hide();
        }, 2000);
    } else {
        // si no es válido
        emailError.style.display = 'block';
    }
}

// localStorage aki 

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Obtener valores de los campos
        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        // Validación básica 
        if (email.trim() === "" || password.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Guardar en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify({ email }));

        alert("Inicio de sesión exitoso!");
        window.location.href = "index.html"; // Redirige 
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const userInfo = document.getElementById("user-info");

    if (usuario) {
        userInfo.innerHTML = `👤 ${usuario.email} <button id="logout-btn">Salir</button>`;
        
        // evento para cerrar sesión
        document.getElementById("logout-btn").addEventListener("click", function () {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "login.html"; // Redirige al login
        });
    } else {
        userInfo.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
    }
});


/TODO: validar nuevo usuario/

