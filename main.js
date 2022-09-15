const productos = [
    {id:1, variedad: "MALBEC", precio: 950, imagen:"./imagenes/botella.jpeg"},
    {id:2, variedad: "CABERNET SAUVIGNON", precio: 900, imagen:"./imagenes/botella.jpeg"},
    {id:3, variedad: "BLANCO DULCE", precio: 850, imagen:"./imagenes/botella.jpeg"},
    {id:4, variedad: "TORRONTES", precio: 800, imagen:"./imagenes/botella.jpeg"},
    {id:5, variedad: "ROSADO", precio: 1000, imagen:"./imagenes/botella.jpeg"},
    {id:6, variedad: "ESPUMOSO", precio: 1200, imagen:"./imagenes/botella.jpeg"},
];
function Usuario (nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}


let boton = document.querySelector("#enviar");
boton.addEventListener("click", nuevoCliente);

function nuevoCliente() {
    let nombre = document.querySelector("#name").value;
    let edad = document.querySelector("#age").value;
    let cliente = new Usuario(nombre, edad);
    validarEdad(cliente);
}
function validarEdad(cliente){
    if (cliente.edad < 18){        
        menorEdad(cliente);            
    } else {
        saludo(cliente);       
    }
}
function menorEdad(cliente){
    let formulario = document.querySelector("#inicio");
    formulario.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Lo sentimos ${cliente.nombre}, pero tu edad no alcanza para ingresar a nuestra tienda. Vuelve cuando seas mayor de 18 años.</p>`;

    nuevoContenido.className = "ingreso";
    document.body.appendChild(nuevoContenido);
}
function saludo(cliente) {
    let form = document.querySelector("#inicio");
    form.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Hola ${cliente.nombre}. Bienvenido a nuestra tienda de vinos</p>
    <button class="boton" onClick="ingresoTienda()">Continuar</button>`;

    nuevoContenido.className = "ingreso";
    document.body.appendChild(nuevoContenido);
}
function ingresoTienda(){
    let contenido = document.querySelector(".ingreso");
    contenido.className = "row";
    contenido.innerHTML = "";
    productos.forEach((producto) => {
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-12", "col-lg-3");
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.variedad}</h4>
                <p class="card-text">$ ${producto.precio}</p>
                <a href="#carrito" class="btn btn-secondary" onClick="agregarCarrito()">Comprar</a>
            </div>`;    
        contenido.appendChild(card);
    });
};
function agregarCarrito(){
    alert("Producto agregado al carrito");    
}