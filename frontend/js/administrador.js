// Muestra en tarjetas los registros guardados en la base de datos
const selectorEntidad = document.getElementById("selectorEntidad");
const contenedorDatos = document.getElementById("contenedor-datos");

async function mostrarRegistros() {
    const entidad = selectorEntidad.value;

    if (entidad === "") {
        contenedorDatos.innerHTML = '<div class="col-12"><p class="text-muted fs-5 text-center">Seleccione una entidad para ver los registros.</p></div>';
        return;
    }

    contenedorDatos.innerHTML = '<div class="col-12"><p class="text-muted fs-5 text-center">Cargando registros...</p></div>';

    try {
        const respuesta = await fetch("http://localhost:3000/" + entidad);
        const registros = await respuesta.json();

        if (registros.length === 0) {
            contenedorDatos.innerHTML = '<div class="col-12"><p class="text-muted fs-5 text-center">No hay registros guardados en esta entidad.</p></div>';
            return;
        }

        let html = "";

        // Formulario que se abre al presionar el lápiz de cada tarjeta
        let paginaEditar = "registrar-stands.html";
        if (entidad === "actividades") {
            paginaEditar = "registrar-actividades.html";
        } else if (entidad === "estudiantes") {
            paginaEditar = "registrar-inscripcion.html";
        }

        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            let titulo = "";
            let datos = "";

            if (entidad === "actividades") {
                const fecha = registro.fecha ? registro.fecha.split("T")[0] : "";
                let requisitos = "Sin requisitos";
                if (registro.requisitos && registro.requisitos.length > 0) {
                    requisitos = registro.requisitos.join(", ");
                }

                titulo = registro.nombre;
                datos = `
                    <p class="mb-2"><strong>Categoría:</strong> ${registro.categoria}</p>
                    <p class="mb-2"><strong>Fecha:</strong> ${fecha}</p>
                    <p class="mb-2"><strong>Hora:</strong> ${registro.hora}</p>
                    <p class="mb-2"><strong>Lugar:</strong> ${registro.lugar}</p>
                    <p class="mb-2"><strong>Cupo máximo:</strong> ${registro.cupoMaximo}</p>
                    <p class="mb-2"><strong>Estado:</strong> ${registro.estado}</p>
                    <p class="mb-0"><strong>Requisitos:</strong> ${requisitos}</p>`;

            } else if (entidad === "estudiantes") {
                titulo = registro.nombreCompleto;
                datos = `
                    <p class="mb-2"><strong>Identificación:</strong> ${registro.identificacion}</p>
                    <p class="mb-2"><strong>Correo:</strong> ${registro.correo}</p>
                    <p class="mb-2"><strong>Teléfono:</strong> ${registro.telefono}</p>
                    <p class="mb-2"><strong>Carrera:</strong> ${registro.carrera}</p>
                    <p class="mb-0"><strong>Actividades inscritas:</strong> ${registro.actividades.length}</p>`;

            } else {
                titulo = registro.nombre;
                datos = `
                    <p class="mb-2"><strong>Categoría:</strong> ${registro.categoria}</p>
                    <p class="mb-2"><strong>Responsable:</strong> ${registro.responsable}</p>
                    <p class="mb-2"><strong>Ubicación:</strong> ${registro.ubicacion}</p>
                    <p class="mb-0"><strong>Descripción:</strong> ${registro.descripcion}</p>`;
            }

            // El botón de cancelar solo se muestra en las actividades que siguen activas
            let botonCancelar = "";
            if (entidad === "actividades" && registro.estado !== "Cancelado") {
                botonCancelar = `
                        <button class="btn btn-sm btn-outline-secondary me-2" title="Cancelar actividad" onclick="cancelarActividad('${registro._id}')">
                            <i class="fa-solid fa-ban"></i>
                        </button>`;
            }

            html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 p-4 shadow-sm border border-dark tarjeta-registro">
                    <h5 class="fw-bold mb-3">${titulo}</h5>
                    <div style="font-size: 0.95rem;">
                        ${datos}
                    </div>

                    <div class="mt-auto pt-3 text-end">
                        <a href="${paginaEditar}?editar=${registro._id}" class="btn btn-sm btn-outline-primary me-2" title="Editar">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        ${botonCancelar}
                        <button class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="eliminarRegistro('${registro._id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        }

        contenedorDatos.innerHTML = html;

    } catch (error) {
        console.log(error);
        contenedorDatos.innerHTML = '<div class="col-12"><p class="text-danger fs-5 text-center">No se pudieron cargar los registros. Verifique que el servidor esté en funcionamiento.</p></div>';
    }
}

// Marca una actividad como cancelada, sin borrarla ni quitar a los inscritos
async function cancelarActividad(id) {
    const confirmar = confirm("¿Desea cancelar esta actividad? Los estudiantes inscritos se mantienen.");

    if (confirmar === false) {
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:3000/actividades/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: "Cancelado" })
        });

        if (respuesta.ok) {
            alert("La actividad quedó cancelada");
            mostrarRegistros();
        } else {
            alert("No se pudo cancelar la actividad");
        }
    } catch (error) {
        console.log(error);
        alert("No se pudo conectar con el servidor");
    }
}

// Elimina el registro de la tarjeta en la que se presionó el basurero
async function eliminarRegistro(id) {
    const entidad = selectorEntidad.value;

    const confirmar = confirm("¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.");

    if (confirmar === false) {
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:3000/" + entidad + "/" + id, {
            method: "DELETE"
        });

        if (respuesta.ok) {
            alert("Registro eliminado correctamente");
            // Se vuelven a cargar las tarjetas para que el registro borrado desaparezca
            mostrarRegistros();
        } else {
            alert("No se pudo eliminar el registro");
        }
    } catch (error) {
        console.log(error);
        alert("No se pudo conectar con el servidor");
    }
}

selectorEntidad.addEventListener("change", mostrarRegistros);
