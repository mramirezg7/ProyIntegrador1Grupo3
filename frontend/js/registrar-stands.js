// Si en la dirección viene un id es porque se va a editar un stand ya guardado
const parametrosStand = new URLSearchParams(window.location.search);
const idStand = parametrosStand.get("editar");

// Al abrir la página se revisa si hay que cargar los datos de un stand
async function cargarStand() {
    if (idStand === null) {
        return;
    }

    // Se cambian los textos para que se note que se está editando
    document.getElementById('titulo-pagina').textContent = 'Editar Stand';
    document.getElementById('btnGuardarStand').textContent = 'Guardar Cambios';

    try {
        const respuesta = await fetch('http://localhost:3000/stands/' + idStand);

        if (!respuesta.ok) {
            alert('No se encontró el stand que se quiere editar');
            return;
        }

        const stand = await respuesta.json();

        document.getElementById('nombre').value = stand.nombre;
        document.getElementById('categoria').value = stand.categoria;
        document.getElementById('responsable').value = stand.responsable;
        document.getElementById('ubicacion').value = stand.ubicacion;
        document.getElementById('descripcion').value = stand.descripcion;

    } catch (error) {
        console.log(error);
        alert('No se pudieron cargar los datos del stand');
    }
}

// Esta función se llama cuando se envía el formulario de registrar-stands.html
async function registrarStand(event) {
    event.preventDefault();

    const datosStand = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        responsable: document.getElementById('responsable').value,
        ubicacion: document.getElementById('ubicacion').value,
        descripcion: document.getElementById('descripcion').value
    };

    // Si hay un id se actualiza el stand, si no se crea uno nuevo
    let direccion = 'http://localhost:3000/stands';
    let metodo = 'POST';

    if (idStand !== null) {
        direccion = 'http://localhost:3000/stands/' + idStand;
        metodo = 'PUT';
    }

    try {
        const respuesta = await fetch(direccion, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosStand)
        });

        if (respuesta.ok) {
            if (idStand !== null) {
                alert('Stand actualizado correctamente');
                window.location.href = 'administrador.html';
            } else {
                alert('Stand registrado correctamente');
                document.getElementById('form-registrar-stand').reset();
            }
        } else {
            alert('No se pudo guardar el stand');
        }
    } catch (error) {
        console.log(error);
    }
};

cargarStand();
