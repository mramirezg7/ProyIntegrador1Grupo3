document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registrar-actividad');

    if (!form) return;

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

        try {
            const response = await fetch('http://localhost:3000/actividades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actividadPayload)
            });

            if (response.ok) {
                alert('¡Actividad registrada con éxito!');
                form.reset();
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