function producto (variedad, precio, cantidad){
    this.variedad = variedad;
    this.precio = precio;
    this.cantidad = cantidad;
}
const productos = [
    {variedad: "MALBEC", precio: 1000},
    {variedad: "CABERNET", precio: 900},
    {variedad: "DULCE", precio: 850},
    {variedad: "TORRONTES", precio: 800},
    {variedad: "ROSADO", precio: 950},
    {variedad: "ESPUMOSO", precio: 1200},
]
function saludo(){
    alert(
        `Hola ${usuario}. Bienvenido/a a la tienda de vinos.`
    );
}
function procesoCompra (carrito){   
    alert("A continuación podrá ver la lista de nuestros productos.")
    let listaproductos = productos.map((articulo)=> articulo.variedad + " " + "$" + articulo.precio);
    alert(listaproductos.join ("\n"))
    let variedad = prompt("ingresa variedad");
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
let usuario = prompt("Ingresar nombre");
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