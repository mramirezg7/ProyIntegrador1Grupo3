// Si en la dirección viene un id es porque se va a editar una actividad ya guardada
const parametrosActividad = new URLSearchParams(window.location.search);
const idActividadEditar = parametrosActividad.get('editar');

// Trae los datos de la actividad y los coloca en el formulario
async function cargarActividad() {
    if (idActividadEditar === null) {
        return;
    }

    // Se cambian los textos para que se note que se está editando
    document.getElementById('titulo-pagina').textContent = 'Editar Actividad';
    document.getElementById('btnGuardarActividad').textContent = 'Guardar Cambios';

    try {
        const respuesta = await fetch('http://localhost:3000/actividades/' + idActividadEditar);

        if (!respuesta.ok) {
            alert('No se encontró la actividad que se quiere editar');
            return;
        }

        const actividad = await respuesta.json();

        document.getElementById('nombre').value = actividad.nombre;
        document.getElementById('encargado').value = actividad.encargado || '';
        document.getElementById('lugar').value = actividad.lugar;
        document.getElementById('fecha').value = actividad.fecha.split('T')[0];
        document.getElementById('hora_inicio').value = actividad.hora;
        document.getElementById('hora_fin').value = actividad.horaFin || '';
        document.getElementById('cupo').value = actividad.cupoMaximo;
        document.getElementById('estado').value = actividad.estado;
        document.getElementById('descripcion').value = actividad.descripcion || '';

        // La categoría guardada puede no estar entre las opciones del select.
        // En ese caso se agrega a la lista para no perderla al guardar.
        const listaTipos = document.getElementById('tipo');
        let categoriaEnLista = false;

        for (let i = 0; i < listaTipos.options.length; i++) {
            if (listaTipos.options[i].value === actividad.categoria) {
                categoriaEnLista = true;
            }
        }

        if (categoriaEnLista === false) {
            const nuevaOpcion = document.createElement('option');
            nuevaOpcion.value = actividad.categoria;
            nuevaOpcion.textContent = actividad.categoria;
            listaTipos.appendChild(nuevaOpcion);
        }

        listaTipos.value = actividad.categoria;

    } catch (error) {
        console.log(error);
        alert('No se pudieron cargar los datos de la actividad');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registrar-actividad');

    if (!form) return;

    cargarActividad();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Los nombres de la izquierda son los del modelo y los de la derecha los del formulario
        const actividadPayload = {
            nombre: data.nombre,
            categoria: data.tipo,
            encargado: data.encargado,
            fecha: data.fecha,
            hora: data.hora_inicio,
            horaFin: data.hora_fin,
            lugar: data.lugar,
            cupoMaximo: Number(data.cupo),
            estado: data.estado,
            descripcion: data.descripcion
        };

        // Si hay un id se actualiza la actividad, si no se crea una nueva
        let direccion = 'http://localhost:3000/actividades';
        let metodo = 'POST';

        if (idActividadEditar !== null) {
            direccion = 'http://localhost:3000/actividades/' + idActividadEditar;
            metodo = 'PUT';
        }

        try {
            const response = await fetch(direccion, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actividadPayload)
            });

            if (response.ok) {
                if (idActividadEditar !== null) {
                    alert('¡Actividad actualizada con éxito!');
                    window.location.href = 'administrador.html';
                } else {
                    alert('¡Actividad registrada con éxito!');
                    form.reset();
                }
            } else {
                const error = await response.json();
                alert(`Error al guardar: ${error.mensajeError || error.msj || 'Error de validación'}`);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('No se pudo conectar con el servidor.');
        }
    });
});
