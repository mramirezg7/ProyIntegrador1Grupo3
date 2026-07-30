// Esta función se llama cuando se envía el formulario de registrar-stands.html
async function registrarStand(event) {
    event.preventDefault();

    const datosStand = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        responsable: document.getElementById('responsable').value,
        ubicacion: document.getElementById('ubicacion').value,
        descripcion: document.getElementById('descripcion').value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/stands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosStand)
        });

        if (respuesta.ok) {
            alert('Stand registrado correctamente');
            document.getElementById('form-registrar-stand').reset();
        } else {
            alert('No se pudo registrar el stand');
        }
    } catch (error) {
        console.log(error);
    }
};
