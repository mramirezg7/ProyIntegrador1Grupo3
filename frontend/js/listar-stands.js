// Cargar la lista de stands desde el servidor
async function obtenerStands() {
    const contenedor = document.getElementById("contenedor-stands");

    try {
        const respuesta = await fetch("http://localhost:3000/stands");
        const stands = await respuesta.json();

        if (stands.length === 0) {
            contenedor.innerHTML = '<p class="text-muted fs-5">Aún no hay stands registrados.</p>';
            return;
        }

        // Mostrar el primer stand destacado
        const primero = stands[0];
        let html = `
        <div class="col-12 col-lg-4">
            <div class="card fondo-tarjeta h-100 p-4 border border-dark border-2">

                <div class="mb-4">
                    <p class="fs-5 mb-2"><strong>Nombre:</strong> ${primero.nombre}</p>
                    <p class="fs-5 mb-2"><strong>Categoría:</strong> ${primero.categoria}</p>
                    <p class="fs-5 mb-2"><strong>Responsable:</strong> ${primero.responsable}</p>
                    <p class="fs-5 mb-3"><strong>Ubicación:</strong> ${primero.ubicacion}</p>

                    <label class="form-label fw-bold fs-5 mb-1">Descripción:</label>
                    <div class="border border-dark p-3 bg-white mb-4" style="min-height: 120px; border-radius: 4px;">
                        <p class="text-muted small mb-0">${primero.descripcion}</p>
                    </div>
                </div>

                
            </div>
        </div>`;

        // Si hay más stands, los agregamos en la columna de al lado
        if (stands.length > 1) {
            html += '<div class="col-12 col-lg-8"><div class="row g-4">';

            for (let i = 1; i < stands.length; i++) {
                const stand = stands[i];
                html += `
                <div class="col-12 col-md-6">
                    <div class="card fondo-tarjeta p-4  h-100 border border-dark d-flex flex-column justify-content-between">
                        <div>
                            <p class="mb-2"><strong>Nombre:</strong> ${stand.nombre}</p>
                            <p class="mb-2"><strong>Categoría:</strong> ${stand.categoria}</p>
                            <p class="mb-2"><strong>Responsable:</strong> ${stand.responsable}</p>
                            <p class="mb-0"><strong>Ubicación:</strong> ${stand.ubicacion}</p>
                            <label class="form-label fw-bold fs-5 mb-1">Descripción:</label>
                    <div class="border border-dark p-3 bg-white mb-4" style="min-height: 120px; border-radius: 4px;">
                        <p class="text-muted small mb-0">${stand.descripcion}</p>
                    </div>
                        </div>
                        
                    </div>
                </div>`;
            }

            html += '</div></div>';
        }

        contenedor.innerHTML = html;

    } catch (error) {
        console.log(error);
        contenedor.innerHTML = '<p class="text-danger fs-5">No se pudieron cargar los stands.</p>';
    }
}

document.addEventListener("DOMContentLoaded", obtenerStands);
