let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numerMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento("p", `¡Acertaste el número y lo intentaste ${intentos} ${(intentos == 1) ? "vez" : "veces"}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {

        //Escenario donde el usuario no acierta
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento("p", "El número secreto es menor.");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor.");
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numerMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los números:
    if (listaNumerosSorteados.length == numerMaximo) {
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles. ¡El juego terminó!");
    } else {

        //Si el número generado está icluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Ingresa un número entre 1 y ${numerMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function resetJuego() {
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números:
    //Generar nuevo número secreto
    //Reiniciar el contador de intentos
    condicionesIniciales();
	//Deshabilitar el botón de "Nuevo Juego":
    document.querySelector("#reiniciar").setAttribute("disabled", true);

}

condicionesIniciales();
