document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registrar-actividad');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Aseguramos que NINGÚN campo requerido por el backend vaya vacío/undefined
        const actividadPayload = {
            nombre: data.nombre || 'Taller de Robótica',
            categoria: data.categoria || data.tipo || 'Taller',
            fecha: data.fecha || new Date().toISOString().split('T')[0],
            hora: data.hora || '10:00', // Asignamos hora por defecto si el formulario no la pide
            lugar: data.lugar || 'Auditorio Principal',
            cupoMaximo: Number(data.cupoMaximo) || 30,
            estado: 'Disponible', // Debe ser 'Disponible' o 'Lleno' según tu backend
            // Usamos la 'descripcion' ingresada como 'requisitos' para cumplir el backend
            requisitos: data.descripcion && data.descripcion.trim() !== '' 
                ? [data.descripcion] 
                : ['Sin requisitos específicos']
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