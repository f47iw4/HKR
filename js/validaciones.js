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


/TODO: validar nuevo usuario/

