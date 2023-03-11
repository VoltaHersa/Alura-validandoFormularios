export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];
const mensajeDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo Correo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo Constraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacio",
        customError: "Debes tener almenos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo Numero no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "El campo Direccion no puede estar vacio",
        patternMismatch: "La dirrecion debe contener de 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacio",
        patternMismatch: "La cuidad debe contener de 5 a 40 caracteres"
    },
    estado: {
        valueMissing: "El campo Estado no puede estar vacio",
        patternMismatch: "El Estado debe contener de 5 a 40 caracteres"
    }
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })

    return mensaje
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener almenos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate() 
        );
    return(diferenciaFechas <= fechaActual);
} 