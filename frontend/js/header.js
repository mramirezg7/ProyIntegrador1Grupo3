// Barra de navegación compartida por todas las páginas del sitio.
// Cada página debe tener un <div id="header"></div> donde se dibuja la barra.
function cargarHeader() {
    const header = document.getElementById("header");

    header.innerHTML = `
    <div class="container-fluid topbar">
        <div class="row h-100 d-flex justify-content-between align-items-center">
            <div class="col-12 col-lg-2">
                <a href="pagina-inicio.html" class="btn text-white fs-4 fw-bold">CampusFest</a>
            </div>

            <div class="col-12 col-lg-5 mb-4 mb-lg-0">
                <div class="row">
                    <div class="col-lg-3 col-lg-12 d-flex justify-content-evenly">
                        <a href="pagina-inicio.html" class="btn text-white border fw-medium">INICIO</a>
                        <a href="lista-actividades.html" class="btn text-white border fw-medium">ACTIVIDADES</a>
                        <a href="sector-agenda.html" class="btn text-white border fw-medium">AGENDA</a>
                        <a href="stands.html" class="btn text-white border fw-medium">STANDS</a>
                        <a href="sector-contacto.html" class="btn text-white border fw-medium">CONTACTO</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-2 text-center text-lg-end mb-4 mb-lg-0">
                <a href="login-administrador.html" class="btn btn-light fw-bold px-4">LOGIN</a>
            </div>
        </div>
    </div>`;

    // Buscar el nombre del archivo de la página actual
    let paginaActual = window.location.pathname.split("/").pop();

    // Las páginas secundarias resaltan la sección a la que pertenecen
    if (paginaActual === "registrar-stands.html") {
        paginaActual = "stands.html";
    }
    if (paginaActual === "registrar-inscripcion.html" || paginaActual === "registrar-actividades.html" || paginaActual.includes("detalle-actividad")) {
        paginaActual = "lista-actividades.html";
    }

    // Marcar en el menú la página actual (el logo y el botón LOGIN no se marcan)
    const enlaces = header.getElementsByTagName("a");
    for (let i = 0; i < enlaces.length; i++) {
        const texto = enlaces[i].textContent;
        if (enlaces[i].getAttribute("href") === paginaActual && texto !== "CampusFest" && texto !== "LOGIN") {
            enlaces[i].classList.add("pagina-activa");
        }
    }
}

document.addEventListener("DOMContentLoaded", cargarHeader);
