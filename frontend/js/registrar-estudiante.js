const { act } = require("react");

const nombre = document.getElementById('nombreCompleto');
const identificacion = document.getElementById('identificacion');
const correo = document.getElementById('correoElectronico');
const telefono = document.getElementById('telefono');
const carrera = document.getElementById('carrera');
const actividad = document.getElementById('actividad');
const btnRegistarEstudiante = document.getElementById('btnGuardar');

async function btnRegistarEstudiante() {
    const datosEstudiante = {
        nombreCompleto: nombre.value,
        identificacion: identificacion.value,
        correo: correo.value,
        telefono: telefono.value,
        carrera: carrera.value,
        actividad: actividad.value
    };
    fetch("http://localhost:3000//estudiantes", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(datosColaborador)
    }).then(response => {
        if(!response.ok){
            Swal.fire({
                icon: "error",
                title: "No se puede registrar el estudiante",
                text: response,
                confirmButtonText: "Aceptar"
            });
        } else{
            Swal.fire({
                icon: "success",
                title: "Estudiante registrado correctamente",
                text: response,
                confirmButtonText: "Aceptar"
            });

        }
    }).catch(error => {
        console.log(error);
    });
    
}