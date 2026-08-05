const btnInscribir = document.getElementById("btnInscribirEstudiante");
const listaActividades = document.getElementById("stlActividad");


mostrarActividades();

function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreCompleto');
    const identificacion = document.getElementById('identificacion');
    const correo = document.getElementById('correoElectronico');
    const telefono = document.getElementById('telefono');
    const carrera = document.getElementById('carrera');
    const actividad = document.getElementById('stlActividad');

    let esValido = true;

    // Limpiar mensajes de error previos
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    

    // Validar nombre completo
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'El nombre completo es requerido');
        esValido = false;
    } else if (!/^[a-záéíóúñ\s]+$/i.test(nombre.value.trim())) {
        mostrarError(nombre, 'El nombre solo puede contener letras y espacios');
        esValido = false;
    }

    // Validar identificación
    if (identificacion.value.trim() === '') {
        mostrarError(identificacion, 'La identificación es requerida');
        esValido = false;
    } else if (!/^\d+$/.test(identificacion.value.trim())) {
        mostrarError(identificacion, 'La identificación solo puede contener números');
        esValido = false;
    }

    // Validar correo
    if (correo.value.trim() === '') {
        mostrarError(correo, 'El correo es requerido');
        esValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
        mostrarError(correo, 'Ingrese un correo válido');
        esValido = false;
    }

    // Validar teléfono
    if (telefono.value.trim() === '') {
        mostrarError(telefono, 'El teléfono es requerido');
        esValido = false;
    } else if (!/^\d+$/.test(telefono.value.trim()) || telefono.value.trim().length < 7) {
        mostrarError(telefono, 'Ingrese un teléfono válido (mínimo 7 dígitos)');
        esValido = false;
    }

    // Validar carrera
    if (carrera.value.trim() === '') {
        mostrarError(carrera, 'La carrera es requerida');
        esValido = false;
    }

    // Validar actividad
    if (actividad.value.trim() === '') {
        mostrarError(actividad, 'La actividad es requerida');
        esValido = false;
    }

    if (esValido) {
        registrarEstudiante();
        
    }
}

function mostrarError(input, mensaje) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback') || crearFeedback(input);
    feedback.textContent = mensaje;
    feedback.style.display = 'block';
}

function crearFeedback(input) {
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.style.display = 'block';
    input.parentElement.appendChild(feedback);
    return feedback;
};

// Esta función se llama desde validarFormulario() (registrar-inscripcion.html)
// una vez que el formulario pasa todas las validaciones
async function registrarEstudiante() {
    const datosEstudiante = {
        nombreCompleto: document.getElementById('nombreCompleto').value,
        identificacion: document.getElementById('identificacion').value,
        correo: document.getElementById('correoElectronico').value,
        telefono: document.getElementById('telefono').value,
        carrera: document.getElementById('carrera').value
    };

    // Leemos los datos en tiempo de ejecución (no arriba de todo el script)
    const datosActividadEstudiante = {
        identificacion: document.getElementById('identificacion').value,
        actividadId: document.getElementById('stlActividad').value
    };

    try {
        // 1. Guardar estudiante (POST)
        const respuestaPost = await fetch('http://localhost:3000/estudiantes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEstudiante)
        });

        if (!respuestaPost.ok) {
            Swal.fire({
                icon: "error",
                title: "No se pudo registrar el estudiante",
                confirmButtonText: "Aceptar"
            });
            return; // Detener flujo si falla el POST
        }

        // 2. Asignar actividad (PUT)
        const respuestaPut = await fetch("http://localhost:3000/estudiantes/agregar-actividad", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosActividadEstudiante)
        });

        if (respuestaPut.ok) {
            Swal.fire({
                icon: "success",
                title: "Estudiante inscrito y actividad asignada con éxito.",
                confirmButtonText: "Aceptar"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Estudiante creado, pero no se pudo asignar la actividad.",
                confirmButtonText: "Aceptar"
            });
        }

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error de conexión con el servidor",
            confirmButtonText: "Aceptar"
        });
    }
}


async function mostrarActividades(){
    fetch("http://localhost:3000/actividades", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        listaActividades.innerHTML = "";
        data.forEach(actividad => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = actividad._id; // 
            nuevaOpcion.textContent = `${actividad.nombre} (${actividad.estado})`;
            if (actividad.estado === 'Lleno') {
                nuevaOpcion.disabled = true; // evita que elijan una llena
            }
            listaActividades.appendChild(nuevaOpcion);
        });
    });
};
