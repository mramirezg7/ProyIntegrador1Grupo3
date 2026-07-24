const btnRegistrarEstudiante = document.getElementById("btnGuardar");


async function registrarEstudiante() {
    const datosEstudiante = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        identificacion: document.getElementById('identificacion').value,
        correo: document.getElementById('correoElectronico').value,
        telefono: document.getElementById('telefono').value,
        carrera: document.getElementById('carrera').value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/estudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEstudiante)
        });

        if (respuesta.ok) {
            alert('Estudiante registrado correctamente');
        } else {
            alert('No se pudo registrar el estudiante');
        }
    } catch (error) {
        console.log(error);
    }
};

btnRegistrarEstudiante.addEventListener("click", registrarEstudiante);
