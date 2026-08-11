document.addEventListener("DOMContentLoaded", cargarAgenda);

async function cargarAgenda() {
    const contenedor = document.getElementById("contenedor-agenda");

    try {
        const respuesta = await fetch("http://localhost:3000/actividades");
        const actividades = await respuesta.json();

        if (!actividades || actividades.length === 0) {
            contenedor.innerHTML = '<p class="text-center text-muted mb-0">No hay actividades programadas en la agenda.</p>';
            return;
        }

        // Ordenar primero por fecha y, si es el mismo día, por hora
        actividades.sort((a, b) => {
            if (a.fecha !== b.fecha) {
                return a.fecha.localeCompare(b.fecha);
            }
            return (a.hora || "").localeCompare(b.hora || "");
        });

        let html = "";

        actividades.forEach((actividad, index) => {
            // Evaluamos la badge de disponibilidad con las clases que ya usabas
            let badgeClass = "border-success text-success bg-success bg-opacity-10";
            let estadoTexto = actividad.estado || "Disponible";

            if (actividad.cupoMaximo <= 0 || estadoTexto === "Lleno") {
                badgeClass = "border-danger text-danger bg-danger bg-opacity-10";
                estadoTexto = "Lleno";
            } else if (estadoTexto === "Cancelado") {
                badgeClass = "border-secondary text-secondary bg-secondary bg-opacity-10";
                estadoTexto = "Cancelado";
            }

            // Margen inferior salvo para la última fila
            const mbClass = (index < actividades.length - 1) ? "mb-5" : "";

            // La fecha viene como 2026-09-15T00:00:00.000Z, se toma solo la parte del día
            const fecha = actividad.fecha ? actividad.fecha.split("T")[0] : "";

            html += `
            <div class="row align-items-center ${mbClass} g-3">
                <div class="col-12 col-md-2 text-md-start">
                    <span class="fw-bold fs-5">${actividad.hora || "N/A"}</span><br>
                    <span class="text-muted">${fecha}</span>
                </div>
                <div class="col-12 col-md-7">
                    <h5 class="fw-bold mb-2">${actividad.nombre}</h5>
                    <div class="border border-dark p-3 rounded bg-light">
                        <p class="mb-1"><strong>Lugar:</strong> ${actividad.lugar || "Por definir"}</p>
                        <p class="mb-0"><strong>Categoría:</strong> ${actividad.categoria || "General"}</p>
                    </div>
                </div>
                <div class="col-12 col-md-3 text-md-end">
                    <div class="border ${badgeClass} fw-bold p-2 text-center rounded" style="max-width: 180px; margin-left: auto;">
                        ${estadoTexto}
                    </div>
                </div>
            </div>`;
        });

        contenedor.innerHTML = html;

    } catch (error) {
        console.error("Error al cargar la agenda:", error);
        contenedor.innerHTML = '<p class="text-center text-danger mb-0">Error al conectar con la base de datos.</p>';
    }
}