document.addEventListener("DOMContentLoaded", async () => {
    // 1. Obtener el ID de la URL (?id=...)
    const params = new URLSearchParams(window.location.search);
    const idActividad = params.get("id");

    if (!idActividad) {
        alert("No se especificó ninguna actividad");
        window.location.href = "lista-actividades.html";
        return;
    }

    try {
        // 2. Consultar el backend por la actividad específica
        const respuesta = await fetch(`http://localhost:3000/actividades/${idActividad}`);
        
        if (!respuesta.ok) throw new Error("No se encontró la actividad");
        
        const actividad = await respuesta.json();

        // 3. Insertar datos en el HTML
        document.getElementById("det-nombre").textContent = actividad.nombre;
        document.getElementById("det-categoria").textContent = actividad.categoria;
        document.getElementById("det-fecha").textContent = actividad.fecha ? actividad.fecha.split("T")[0] : "";
        document.getElementById("det-hora").textContent = actividad.hora;
        document.getElementById("det-lugar").textContent = actividad.lugar;
        document.getElementById("det-cupo").textContent = actividad.cupoMaximo;
        document.getElementById("det-estado").textContent = actividad.estado;

        // Renderizar lista de requisitos
        const listaRequisitos = document.getElementById("det-requisitos");
        listaRequisitos.innerHTML = "";
        
        if (Array.isArray(actividad.requisitos) && actividad.requisitos.length > 0) {
            actividad.requisitos.forEach(req => {
                const li = document.createElement("li");
                li.textContent = req;
                listaRequisitos.appendChild(li);
            });
        } else {
            listaRequisitos.innerHTML = "<li>Sin requisitos especiales.</li>";
        }

    } catch (error) {
        console.error(error);
        alert("Error al cargar los detalles de la actividad");
    }
});