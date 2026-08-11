// Esta función se llama cuando se envía el formulario de login-administrador.html
function validarAdministrador(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value.trim().toLowerCase();

    if (correo.endsWith('@cenfotec.ac.cr')) {
        // Guardamos que el usuario ingresó como administrador mientras dure la pestaña
        sessionStorage.setItem('esAdministrador', 'true');
        window.location.href = 'administrador.html';
    } else {
        alert('El usuario no es aceptado como administrador. Debe usar un correo @cenfotec.ac.cr');
    }
}
