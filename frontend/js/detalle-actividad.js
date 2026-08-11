document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const idActividad = params.get("id");
    

    if (!idActividad) {
        alert("No se especificó ninguna actividad");
        window.location.href = "lista-actividades.html";
        return;
    }

    // Evento del botón Inscribirme
    const btnInscribirme = document.getElementById("btnInscribirme");

    if (btnInscribirme) {
        btnInscribirme.addEventListener("click", () => {
            window.location.href = `registrar-inscripcion.html?id=${idActividad}`;
        });
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/actividades/${idActividad}`);
        
        if (!respuesta.ok) throw new Error("No se encontró la actividad");
        
        const actividad = await respuesta.json();

        // Mapear campos dinámicos
        document.getElementById("det-nombre").textContent = actividad.nombre || "Sin nombre";
        document.getElementById("det-descripcion").textContent = actividad.descripcion || "Sin descripción disponible para esta actividad.";
        document.getElementById("det-categoria").textContent = actividad.categoria || "";
        document.getElementById("det-fecha").textContent = actividad.fecha ? actividad.fecha.split("T")[0] : "";
        document.getElementById("det-hora").textContent = actividad.hora || "";
        document.getElementById("det-lugar").textContent = actividad.lugar || "";
        document.getElementById("det-cupo").textContent = actividad.cupoMaximo || "";
        document.getElementById("det-estado").textContent = actividad.estado || "";
        document.getElementById("det-imagen").src = obtenerImagenActividad(actividad.categoria);
        document.getElementById("det-imagen").alt = actividad.nombre || "Actividad";

        // Si la actividad está llena o cancelada, deshabilitar el botón
        if (actividad.estado === "Lleno" || actividad.cupoMaximo <= 0) {
            btnInscribirme.disabled = true;
            btnInscribirme.classList.replace("btn-warning", "btn-secondary");
            btnInscribirme.textContent = "Cupo Lleno";
        }

        // Renderizar Requisitos
        const contRequisitos = document.getElementById("det-requisitos");
        if (Array.isArray(actividad.requisitos) && actividad.requisitos.length > 0) {
            let ul = document.createElement("ul");
            actividad.requisitos.forEach(req => {
                let li = document.createElement("li");
                li.textContent = req;
                ul.appendChild(li);
            });
            contRequisitos.innerHTML = "";
            contRequisitos.appendChild(ul);
        } else if (typeof actividad.requisitos === "string" && actividad.requisitos.trim() !== "") {
            contRequisitos.textContent = actividad.requisitos;
        } else {
            contRequisitos.textContent = "Sin requisitos especiales para esta actividad.";
        }

    } catch (error) {
        console.error(error);
        alert("Error al cargar los detalles de la actividad");
    }
});