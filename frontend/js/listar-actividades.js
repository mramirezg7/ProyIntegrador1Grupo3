// Cargar actividades registradas desde la API
async function obtenerActividades() {
    const contenedor = document.getElementById("contenedor-actividades");

    try {
        const respuesta = await fetch("http://localhost:3000/actividades");
        const actividades = await respuesta.json();

        if (actividades.length === 0) {
            contenedor.innerHTML = '<p class="text-muted fs-5 text-center">Aún no hay actividades registradas.</p>';
            return;
        }

        let html = "";

        for (let i = 0; i < actividades.length; i++) {
            const actividad = actividades[i];

            // 1. Imagen por defecto para las actividades
            let imagen = "../img/campusFest.jpg";

            // 2. CAMBIO CLAVE: Pasar el ID único de la actividad en la URL
            const paginaDetalle = `detalle-actividad.html?id=${actividad._id}`;

            // Asignar color de la insignia de estado
            let colorEstado = "bg-danger";
            if (actividad.estado === "Disponible") {
                colorEstado = "bg-success";
            }

            const fechaFormateada = actividad.fecha ? actividad.fecha.split("T")[0] : "";

            html += `
            <div class="col">
                <div class="card h-100 shadow-sm text-center p-3">
                    <div class="bg-light border d-flex align-items-center justify-content-center mb-3" style="height: 150px;">
                        <img src="${imagen}" class="img-fluid" alt="${actividad.nombre}" style="max-height: 100%; object-fit: contain;">
                    </div>

                    <div class="card-body p-0 d-flex flex-column justify-content-between">
                        <div class="text-start mb-3" style="font-size: 0.9rem;">
                            <h5 class="card-title fw-bold text-center mb-3">${actividad.nombre}</h5>
                            <p class="card-text mb-1"><strong>Categoría:</strong> ${actividad.categoria}</p>
                            <p class="card-text mb-1"><strong>Fecha:</strong> ${fechaFormateada}</p>
                            <p class="card-text mb-1"><strong>Hora:</strong> ${actividad.hora}</p>
                            <p class="card-text mb-1"><strong>Lugar:</strong> ${actividad.lugar}</p>
                            <p class="card-text mb-1"><strong>Cupo Máximo:</strong> ${actividad.cupoMaximo}</p>
                            <p class="card-text mb-0"><strong>Estado:</strong> <span class="badge ${colorEstado}">${actividad.estado}</span></p>
                        </div>

                        <div class="mt-auto">
                            <a href="${paginaDetalle}" class="btn btn-warning w-100 rounded-pill fw-bold">Ver detalles</a>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        contenedor.innerHTML = html;

    } catch (error) {
        console.log(error);
        contenedor.innerHTML = '<p class="text-danger fs-5 text-center">No se pudieron cargar las actividades.</p>';
    }
}

document.addEventListener("DOMContentLoaded", obtenerActividades);