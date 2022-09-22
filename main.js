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
let carrito = [];
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
let total = 0;
let main = document.querySelector("#main");
let boton = document.querySelector("#enviar");
boton.addEventListener("click", nuevoCliente);

function nuevoCliente() {
    let nombre = document.querySelector("#name").value;
    let edad = document.querySelector("#age").value;
    let cliente = new Usuario(nombre, edad);
    (cliente.edad < 18) ? menorEdad(cliente) : saludo(cliente);
}
function menorEdad(cliente){
    let formulario = document.querySelector("#inicio");
    formulario.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Lo sentimos ${cliente.nombre}, pero tu edad no alcanza para ingresar a nuestra tienda. Volvé cuando seas mayor de 18 años.</p>`;

    nuevoContenido.className = "ingreso";
    document.body.appendChild(nuevoContenido);
}
function saludo(cliente) {
    let form = document.querySelector("#inicio");
    form.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Hola ${cliente.nombre}. Bienvenido a nuestra tienda de vinos.</p>
    <button class="boton" onClick="ingresoTienda()">Continuar</button>`;

    nuevoContenido.className = "ingreso";
    document.body.appendChild(nuevoContenido);
    sessionStorage.setItem("cliente",JSON.stringify(cliente));    
}
function ingresoTienda(){
    let contenido = document.querySelector(".ingreso");
    contenido.className = "row";
    contenido.innerHTML = "";
    productos.forEach((producto,id) => {
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-12", "col-lg-3");
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.variedad}</h4>
                <p class="card-text">$ ${producto.precio}</p>
                <a href="#carrito" class="btn btn-secondary" onClick="agregarCarrito(${id})">Comprar</a>
            </div>`;    
        contenido.appendChild(card);
    });
    main.appendChild(contenido)
    let botonCart = document.querySelector("#btnCart");
    botonCart.addEventListener("click", mostrarCarrito);
};
function agregarCarrito(id){
    const carritoId = carrito.findIndex((art) => {
        return art.id === productos[id].id
    });
    if(carritoId === -1){
        const prodAgregar = productos[id];
        prodAgregar.cantidad=1;
        carrito.push(prodAgregar);
        storage(carrito);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1000
          });        
    } else {
        carrito[carritoId].cantidad +=1; 
        storage(carrito); 
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1000
          });        
    }
}
function storage(carrito){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}
function mostrarCarrito(){
    main.innerHTML = "";
    const divCarrito = document.createElement("section");
    divCarrito.className = "cart-design";
    divCarrito.innerHTML = `<h3 class="cart-titulo">Carrito de Compras</h3>`
    main.appendChild(divCarrito);
    if(carrito.length>0){
        carrito.forEach((producto,id)=>{            
            total = total + producto.precio*producto.cantidad;
            const carritoCard = document.createElement("div");
            carritoCard.className = "carritoCard";
            carritoCard.innerHTML = `
            <img src="${producto.imagen}" class="cart-img">
            <div class="card-body">Producto: ${producto.variedad}</div>
            <div class="card-body">Cantidad: ${producto.cantidad}</div>
            <div class="card-body">$ ${producto.precio}</div>
            <div class="card-body">Subtotal: ${producto.precio*producto.cantidad}</div>
            <button class="boton" onClick="productDelete(${id})">Borrar Producto</button>
            `
            divCarrito.appendChild(carritoCard)
        });
        const totalCarrito = document.createElement("div");
        totalCarrito.className = "totalCarrito";
        totalCarrito.innerHTML = `
        <h2 class="totalCarrito">Total $ ${total}</h2>
        <button class="boton" onClick="seguirComprando()">Agregar más productos</button>
        <button class="boton" onClick="finalizarCompra()">Terminar Compra</button>
        <button class="boton" onClick="borrarCarrito()">Vaciar Carrito</button>`
        divCarrito.appendChild(totalCarrito);
    } else {
        const carritoVacio = document.createElement("div");
        carritoVacio.className = "totalCarrito";
        carritoVacio.innerHTML = `
        <p>El carrito esta vacío! Volvé a la tienda y seleccioná nuestros productos.</p>
        <button class="boton" onClick="seguirComprando()">Agregar más productos</button>
        <button class="boton" onClick="finalizarCompra()">Terminar Compra</button>
        `
        divCarrito.appendChild(carritoVacio);
    }

}
function productDelete(id){       
    carrito.splice(id,1);
    total = 0;
    storage(carrito);
    mostrarCarrito();    
}
function borrarCarrito(){
    carrito=[];
    total = 0;
    storage(carrito);
    mostrarCarrito();
}
function seguirComprando(){
    main.innerHTML = "";
    let section = document.createElement("section")
    section.className = "row";
    main.appendChild(section)
    productos.forEach((producto,id) => {
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-12", "col-lg-3");
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.variedad}</h4>
                <p class="card-text">$ ${producto.precio}</p>
                <a href="#carrito" class="btn btn-secondary" onClick="agregarCarrito(${id})">Comprar</a>
            </div>`;    
        section.appendChild(card);
    });
}
function finalizarCompra(){
    main.innerHTML = "";
    const finCompra = document.createElement("section")
    finCompra.className = "finCompra";
    finCompra.innerHTML = `<p>Completar formulario para finalizar la compra.</p>
        <div class="form">                
            <div class="column">            
                <input type="text" class="form-control" placeholder="juan.perez" aria-label="Username">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" placeholder="gmail.com" aria-label="Server"> 
                <label for="inputAddress" class="form-label">DIRECCION</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="Calle Falsa 123">                
                <label for="tel">TELEFONO</label>
                <input class="field" type="text" name="tel" id="tel" autocomplete="off"placeholder="1123456789">                    
                <button class="boton" onClick="saludoFinal()" id="send">Enviar</button>                
            </div> 
        </div> `
    main.appendChild(finCompra);
    carrito=[];
    total = 0;     
}
function saludoFinal(){
    let usuario = JSON.parse(sessionStorage.getItem("cliente"));
    main.innerHTML = "";
    const saludoFinal = document.createElement("div")
    saludoFinal.className = "finCompra";
    saludoFinal.innerHTML = `<h3>¡¡Muchas gracias ${usuario.nombre}!!</h3> 
    <p>Recibirás el resumen de la compra al mail proporcionado.</p>
    <p>¡Hasta la próxima!</p>`
    main.appendChild(saludoFinal)
}