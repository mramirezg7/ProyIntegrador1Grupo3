const btnInscribir = document.getElementById("btnInscribirEstudiante");
const listaActividades = document.getElementById("stlActividad");

// Si en la dirección viene "editar" es porque se va a modificar un estudiante ya guardado
const parametrosEstudiante = new URLSearchParams(window.location.search);
const idEstudianteEditar = parametrosEstudiante.get("editar");


mostrarActividades();
cargarEstudiante();

// Trae los datos del estudiante y los coloca en el formulario
async function cargarEstudiante() {
    if (idEstudianteEditar === null) {
        return;
    }

    // Se cambian los textos para que se note que se está editando
    document.getElementById("titulo-pagina").textContent = "Editar Estudiante";
    btnInscribir.textContent = "Guardar Cambios";

    // Al editar solo se cambian los datos personales, la actividad no se toca
    document.getElementById("bloque-actividad").style.display = "none";
    listaActividades.removeAttribute("required");

    try {
        const respuesta = await fetch("http://localhost:3000/estudiantes/" + idEstudianteEditar);

        if (!respuesta.ok) {
            alert("No se encontró el estudiante que se quiere editar");
            return;
        }

        const estudiante = await respuesta.json();

        document.getElementById("nombreCompleto").value = estudiante.nombreCompleto;
        document.getElementById("identificacion").value = estudiante.identificacion;
        document.getElementById("correoElectronico").value = estudiante.correo;
        document.getElementById("telefono").value = estudiante.telefono;
        document.getElementById("carrera").value = estudiante.carrera;

    } catch (error) {
        console.log(error);
        alert("No se pudieron cargar los datos del estudiante");
    }
}

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

    // Validar actividad (al editar un estudiante no se pide la actividad)
    if (idEstudianteEditar === null && actividad.value.trim() === '') {
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

    // Si se está editando solo se actualizan los datos personales del estudiante
    if (idEstudianteEditar !== null) {
        try {
            const respuestaPut = await fetch("http://localhost:3000/estudiantes/" + idEstudianteEditar, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosEstudiante)
            });

            if (respuestaPut.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Estudiante actualizado con éxito.",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    window.location.href = "administrador.html";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo actualizar el estudiante",
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

        return;
    }

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
            document.getElementById("formulario").reset();
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
    // Leer el id que viene en la URL (?id=...)
    const params = new URLSearchParams(window.location.search);
    const idActividadURL = params.get("id");

    fetch("http://localhost:3000/actividades", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        listaActividades.innerHTML = '<option value="">Seleccione una actividad...</option>';
        data.forEach(actividad => {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = actividad._id; 
            nuevaOpcion.textContent = `${actividad.nombre} (${actividad.estado})`;
            
            if (actividad.estado === 'Lleno' || actividad.estado === 'Cancelado') {
                nuevaOpcion.disabled = true; // evita que elijan una llena
            }

            // Si coincide con el ID pasado por URL, lo deja marcado por defecto
            if (idActividadURL && actividad._id === idActividadURL) {
                nuevaOpcion.selected = true;
            }

            listaActividades.appendChild(nuevaOpcion);
        });
    })
    .catch(error => console.error("Error al cargar actividades:", error));
};
