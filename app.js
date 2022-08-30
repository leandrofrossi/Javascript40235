function saludo(){
    alert(
        `Hola ${usuario}. Bienvenido/a a la tienda de vinos.`
    );
}
function procesoCompra(){
    articulo = prompt("Seleccione un producto: \n 1- Malbec($1000) \n 2- Cabernet Sauvignon($900) \n 3- Blanco Dulce($850) \n 4- Torrontes ($800) \n 5- Rosado ($950) \n 6- Espumoso ($1200)");

    switch (articulo){
        case "1":
            alert("Se ha seleccionado Malbec");
        break;
        case "2":
            alert("Se ha seleccionado Cabernet Sauvignon");
        break;
        case "3":
            alert("Se ha seleccionado Blanco Dulce");
        break;
        case "4":
            alert("Se ha seleccionado Torrontes");
        break;
        case "5":
            alert("Se ha seleccionado Rosado");
        break;
        case "6":
            alert("Se ha seleccionado Espumoso");
        break;
        default:
            alert("Opción incorrecta. Ingrese una opción válida")
        break;
    }
    metodoPago();
}
function metodoPago(){
    formaPago = prompt("Seleccione un método de pago: \n 1- Efectivo(10% descuento) \n 2- Tarjeta \n 3- Transferencia(5% descuento)");

    if (formaPago == "1"){
        alert("El pago es en Efectivo. Tiene 10% de descuento.")
    } else if (formaPago == "2"){
        alert("El pago es en Tarjeta.")
    } else if (formaPago == "3"){
        alert("El pago es en Transferencia. Tiene 5% de descuento.")
    } else {
        alert("Opción incorrecta. Ingrese una opción válida")
    }

    menu = prompt("Vuelva a seleccionar una opcion del menu: \n 2- Finalizar la compra \n 3- Salir");
}
function finalizarCompra(){

    if (articulo == "1" && formaPago == "1"){
        alert(`La compra realizada es de un vino Malbec en Efectivo. Precio final = $${vinoMalbec*efectivo}`)
    } else if (articulo == "1" && formaPago == "2"){
        alert(`La compra realizada es de un vino Malbec con Tarjeta. Precio final = $${vinoMalbec*tarjeta}`)
    } else if (articulo == "1" && formaPago == "3"){
        alert(`La compra realizada es de un vino Malbec con Transferencia. Precio final = $${vinoMalbec*transferencia}`)
    } else if (articulo == "2" && formaPago == "1"){
        alert(`La compra realizada es de un vino Cabernet Sauvignon en Efectivo. Precio final = $${vinoCabSau*efectivo}`)
    } else if (articulo == "2" && formaPago == "2"){
        alert(`La compra realizada es de un vino Cabernet Sauvignon con Tarjeta. Precio final = $${vinoCabSau*tarjeta}`)
    } else if (articulo == "2" && formaPago == "3"){
        alert(`La compra realizada es de un vino Cabernet Sauvignon con Transferencia. Precio final = $${vinoCabSau*transferencia}`)
    } else if (articulo == "3" && formaPago == "1"){
        alert(`La compra realizada es de un vino Blanco Dulce en Efectivo. Precio final = $${vinoBcoDul*efectivo}`)
    } else if (articulo == "3" && formaPago == "2"){
        alert(`La compra realizada es de un vino Blanco Dulce con Tarjeta. Precio final = $${vinoBcoDul*tarjeta}`)
    } else if (articulo == "3" && formaPago == "3"){
        alert(`La compra realizada es de un vino Blanco Dulce con Transferencia. Precio final = $${vinoBcoDul*transferencia}`)
    } else if (articulo == "4" && formaPago == "1"){
        alert(`La compra realizada es de un vino Torrontes en Efectivo. Precio final = $${vinoTorrontes*efectivo}`)
    } else if (articulo == "4" && formaPago == "2"){
        alert(`La compra realizada es de un vino Torrontes con Tarjeta. Precio final = $${vinoTorrontes*tarjeta}`)
    } else if (articulo == "4" && formaPago == "3"){
        alert(`La compra realizada es de un vino Torrontes con Transferencia. Precio final = $${vinoTorrontes*transferencia}`)
    } else if (articulo == "5" && formaPago == "1"){
        alert(`La compra realizada es de un vino Rosado en Efectivo. Precio final = $${vinoRosado*efectivo}`)
    } else if (articulo == "5" && formaPago == "2"){
        alert(`La compra realizada es de un vino Rosado con Tarjeta. Precio final = $${vinoRosado*tarjeta}`)
    } else if (articulo == "5" && formaPago == "3"){
        alert(`La compra realizada es de un vino Rosado con Transferencia. Precio final = $${vinoRosado*transferencia}`)
    } else if (articulo == "6" && formaPago == "1"){
        alert(`La compra realizada es de un vino Espumoso en Efectivo. Precio final = $${vinoEspumoso*efectivo}`)
    } else if (articulo == "6" && formaPago == "2"){
        alert(`La compra realizada es de un vino Espumoso con Tarjeta. Precio final = $${vinoEspumoso*tarjeta}`)
    } else if (articulo == "6" && formaPago == "3"){
        alert(`La compra realizada es de un vino Espumoso con Transferencia. Precio final = $${vinoEspumoso*transferencia}`)
    } else {
        alert("Compra no realizada.")
    }    
}

let articulo;
let formaPago;
let vinoMalbec = 1000;
let vinoCabSau = 900;
let vinoBcoDul = 850;
let vinoTorrontes = 800;
let vinoRosado = 950;
let vinoEspumoso = 1200;
let efectivo = 0.9;
let tarjeta = 1;
let transferencia = 0.95;
let usuario = prompt("Ingresar nombre");

saludo();
let menu = prompt("Seleccionar una opcion del menu: \n 1- Iniciar compra. \n 2- Finalizar la compra. \n 3- Salir.");
while (menu != "3"){
    if (menu == "1"){
        procesoCompra();
    }
    if (menu == "2"){
        finalizarCompra();
        menu = "3";
    } else{
        menu = "3";
        alert ("Compra no realizada.");
    }
}

alert (`Gracias por su compra ${usuario}. Esperamos que vuelva pronto. Hasta la próxima!`);