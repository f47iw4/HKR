function validateEmail() {
    var email = document.getElementById('email').value;
    var emailError = document.getElementById('emailError');
    var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    // Expresión regular para validar el correo electrónico
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Si el correo es válido
    if (regex.test(email)) {
        emailError.style.display = 'none'; // Ocultamos el error
        successModal.show(); // Mostramos el modal de éxito
        setTimeout(() => {
            // Cerrar el modal de éxito después de 3 segundos
            var subscribeModal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
            subscribeModal.hide();
        }, 3000);
    } else {
        // Si el correo no es válido
        emailError.style.display = 'block';
    }
}