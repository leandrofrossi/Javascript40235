function producto (variedad, precio, cantidad){
    this.variedad = variedad;
    this.precio = precio;
    this.cantidad = cantidad;
}
const productos = [
    {variedad: "MALBEC", precio: 950},
    {variedad: "CABERNET SAUVIGNON", precio: 900},
    {variedad: "BLANCO DULCE", precio: 850},
    {variedad: "TORRONTES", precio: 800},
    {variedad: "ROSADO", precio: 1000},
    {variedad: "ESPUMOSO", precio: 1200},
]
function saludo(){
    alert(
        `Hola ${usuario}. Bienvenido/a a la tienda de vinos.`
    );
}
function procesoCompra (carrito){   
    let filtro = prompt("Seleccione una variedad: \n 1- Tintos \n 2- Blancos \n 3- Rosado/Espumoso \n 4- Todos");
        if (filtro == "1"){
            let tintos = productos.filter((articulo)=> articulo.precio >= 900 && articulo.precio < 1000);
            let listatintos = tintos.map((articulo)=> articulo.variedad + " " + "$" + articulo.precio);
            alert(listatintos.join ("\n"));            
        }
        if (filtro == "2"){
            let blancos = productos.filter((articulo)=> articulo.precio < 900);
            let listablancos = blancos.map((articulo)=> articulo.variedad + " " + "$" + articulo.precio);
            alert(listablancos.join ("\n"));    
        }
        if (filtro == "3"){
            let otros = productos.filter((articulo)=> articulo.precio >= 1000);
            let listaotros = otros.map((articulo)=> articulo.variedad + " " + "$" + articulo.precio);
            alert(listaotros.join ("\n"));    
        }
        if (filtro == "4"){
            let listaproductos = productos.map((articulo)=> articulo.variedad + " " + "$" + articulo.precio);
            alert(listaproductos.join ("\n"))
        }
    let variedad = (prompt("ingresa variedad")).toUpperCase();
    let precio = Number(prompt("ingresa precio"));
    let cantidad = Number(prompt("ingresa cantidad"));
    const newProduct = new producto (variedad, precio, cantidad);
    carrito.push(newProduct);
    alert("Producto agregado al carrito");     
    menu = prompt("Vuelva a seleccionar una opcion del menu: \n 1- Seguir comprando. \n 2- Finalizar la compra. \n 3- Salir."); 
}
function resumenCompra (){
    let todoslosproductos = carrito.map((producto)=> producto.variedad + " " + "$" + producto.precio + "x" + producto.cantidad + "= $" + producto.precio*producto.cantidad);
    alert(todoslosproductos.join ("\n"))
}
function finalizarCompra(){
    resumenCompra(carrito);
    let total = 0;
    carrito.forEach((producto)=>(total += producto.precio*producto.cantidad));
    alert(`Total a pagar: $${total}`);    
}


let carrito = [];
let usuario = (prompt("Ingresar nombre")).toUpperCase();
saludo();
let menu = prompt("Seleccionar una opcion del menu: \n 1- Iniciar compra. \n 2- Finalizar la compra. \n 3- Salir.");
while (menu != "3"){
    switch(menu){
        case "1":
            procesoCompra (carrito);
        break;
        case "2":
            finalizarCompra(carrito);
            menu = "3";
        break;
        default:
            menu = "3";
            alert("Compra no realizada.");
        break;
    }   
}
alert (`Gracias por su compra ${usuario}. Esperamos que vuelva pronto. Hasta la próxima!`);