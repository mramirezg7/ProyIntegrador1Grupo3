function obtenerImagenActividad(categoria) {
    let texto = "";
    if (categoria) {
        texto = categoria.toLowerCase();
    }

    if (texto.includes("taller")) {
        return "../img/taller.jpg";
    }

    if (texto.includes("conferencia")) {
        return "../img/conferencia.jpg";
    }

    if (texto.includes("torneo")) {
        return "../img/torneo.jpg";
    }

    if (texto.includes("presentación artística")) {
        return "../img/presentacion-artistica.jpg";
    }

    return "../img/otro.jpg";
}