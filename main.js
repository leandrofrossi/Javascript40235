//traigo los productos del archivo json
let productos = [];
async function traerProductos(){
    const respuesta = await fetch ('./productos.json')
    const data = await respuesta.json()
    for(let obj of data){
        productos.push(obj)
    }     
}
traerProductos();

function Usuario (nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
};

//inicializo el carrito con datos del LS o vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
let main = document.querySelector("#main");
let boton = document.querySelector("#enviar");
boton.addEventListener("click", nuevoCliente);

//capturo datos del usuario y valido la edad
function nuevoCliente() {
    let nombre = document.querySelector("#name").value.toUpperCase();
    let edad = document.querySelector("#age").value;
    let cliente = new Usuario(nombre, edad);
    if(!cliente.nombre || !cliente.edad){
        Swal.fire({
            icon: 'error',
            title: '¡Faltan datos!',
            text: 'Ingrese todos los datos solicitados.', 
            allowOutsideClick: false,       
          });   
    }else{
        (cliente.edad < 18) ? menorEdad(cliente) : saludo(cliente);
    };
};
function menorEdad(cliente){
    let formulario = document.querySelector("#inicio");
    formulario.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Lo sentimos <span>${cliente.nombre}</span>, pero tu edad no alcanza para ingresar a nuestra tienda.</p>
    <p>Volvé cuando seas mayor de 18 años.</p>`;
    nuevoContenido.className = "ingreso";
    main.appendChild(nuevoContenido);
    Swal.fire({
        icon: 'error',
        title: 'Ingreso Prohibido',
        text: 'El ingreso solo está permitido para mayores de 18 años', 
        allowOutsideClick: false,       
    });
};
function saludo(cliente) {
    let form = document.querySelector("#inicio");
    form.innerHTML = "";
    let nuevoContenido = document.createElement("div");
    nuevoContenido.innerHTML = `<p>Hola <span>${cliente.nombre}</span>.</p>
    <button class="btn btn-primary" onClick="ingresoTienda()">Continuar</button>`;
    Swal.fire({
        title: `<p>¡Hola <span>${cliente.nombre}</span>!</p>`,        
        text: "Bienvenido a nuestra tienda de vinos.",
        color: 'black',
        imageUrl: './imagenes/saludo.jpg',
        imageWidth: 450,
        imageHeight: 300,
        imageAlt: 'Custom image',        
        confirmButtonColor: '#3085d6',        
        confirmButtonText: 'Ingresar',
        allowOutsideClick: false , 
    }).then((result) => {
        result.isConfirmed && ingresoTienda()          
    });

    nuevoContenido.className = "ingreso";
    main.appendChild(nuevoContenido);
    sessionStorage.setItem("cliente",JSON.stringify(cliente));    
};
//ingreso a la tienda
function ingresoTienda(){
    let contenido = document.querySelector(".ingreso");
    contenido.className = "row";
    contenido.innerHTML = "";
    productos.forEach((producto,id) => {
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-6", "col-lg-3");
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.variedad}</h4>
                <p class="card-text">$ ${producto.precio}</p>
                <a href="#carrito" class="btn btn-primary" onClick="agregarCarrito(${id})">Comprar</a>
            </div>`;    
        contenido.appendChild(card);
    });
    main.appendChild(contenido)
    let botonCart = document.querySelector("#btnCart");
    botonCart.addEventListener("click", mostrarCarrito);
};
//evento agregado de producto al carrito y guardado al LS
function agregarCarrito(id){
    const carritoId = carrito.findIndex((art) => {
        return art.id === productos[id].id
    });
    if(carritoId === -1){
        const prodAgregar = productos[id];
        prodAgregar.cantidad=1;
        carrito.push(prodAgregar);
        storage(carrito);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,             
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            color: 'black',
          })        
    } else {
        carrito[carritoId].cantidad +=1; 
        storage(carrito); 
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,            
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Producto agregado al carrito'
          })         
    }
};
function storage(carrito){
    localStorage.setItem("carrito",JSON.stringify(carrito));
};
//muestro carrito y sus funciones
function mostrarCarrito(){
    main.innerHTML = "";
    const divCarrito = document.createElement("section");
    divCarrito.className = "cart-design";
    divCarrito.innerHTML = `<h3 class="cart-titulo">Carrito de Compras</h3>`
    main.appendChild(divCarrito);
    if(carrito.length>0){
        carrito.forEach((producto,id)=>{            
            const carritoCard = document.createElement("div");
            carritoCard.className = "carritoCard";
            carritoCard.innerHTML = `
            <img src="${producto.imagen}" class="cart-img img-fluid">
            <div class="card-body">Producto: <span>${producto.variedad}</span></div>
            <div class="card-body">Cantidad: <span>${producto.cantidad}</span></div>
            <div class="card-body">$ <span>${producto.precio}</span></div>
            <div class="card-body">Subtotal: <span>${producto.precio*producto.cantidad}</span></div>
            <button class="btn btn-primary" onClick="productDelete(${id})">Borrar Producto</button>
            `
            divCarrito.appendChild(carritoCard)
        });
        total = carrito.reduce((acc,producto)=>{
            return acc + producto.precio*producto.cantidad
        },0);
        const totalCarrito = document.createElement("div");
        totalCarrito.className = "totalCarrito";
        totalCarrito.innerHTML = `
        <h2 class="totalCarrito">Total $ ${total}</h2>
        <button class="btn btn-primary" onClick="seguirComprando()">Agregar más productos</button>
        <button class="btn btn-primary" onClick="finalizarCompra()">Terminar Compra</button>
        <button class="btn btn-primary" onClick="borrarCarrito()">Vaciar Carrito</button>`
        divCarrito.appendChild(totalCarrito);
    } else {
        const carritoVacio = document.createElement("div");
        carritoVacio.className = "totalCarrito";
        carritoVacio.innerHTML = `
        <p>El carrito esta vacío! Volvé a la tienda y seleccioná nuestros productos.</p>
        <button class="btn btn-primary" onClick="seguirComprando()">Agregar más productos</button>
        `
        divCarrito.appendChild(carritoVacio);
    }

};
function productDelete(id){  
    Swal.fire({
        title: '¿Eliminar producto?',
        text: "Se eliminará el producto del carrito definitivamente",
        color: 'black',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar.',
        allowOutsideClick: false, 
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Eliminado!',
                'El producto fue eliminado del carrito',
                'success'
            );
            carrito.splice(id,1);
            total = 0;
            storage(carrito);
            mostrarCarrito();        
        }
    }) 
};
function borrarCarrito(){
    Swal.fire({
        title: '¿Estas seguro/a?',
        text: "Se eliminarán todos los productos del carrito.",
        color: 'black',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar.',
        allowOutsideClick: false, 
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Vaciado!',
                'Productos eliminados, el carrito ahora está vacío.',
                'success'
            );
            carrito=[];
            total = 0;
            storage(carrito);
            mostrarCarrito();
        }
    })    
};
function seguirComprando(){
    main.innerHTML = "";
    let section = document.createElement("section")
    section.className = "row";
    main.appendChild(section)
    productos.forEach((producto,id) => {
        let card = document.createElement("div");
        card.classList.add("card", "col-sm-6", "col-lg-3");
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.variedad}</h4>
                <p class="card-text">$ ${producto.precio}</p>
                <a href="#carrito" class="btn btn-primary" onClick="agregarCarrito(${id})">Comprar</a>
            </div>`;    
        section.appendChild(card);
    });
};
//final de compra y formulario de entrega
function finalizarCompra(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Desea finalizar la compra?',        
        icon: 'warning',
        color: 'black',
        showCancelButton: true,
        confirmButtonText: 'Si, finalizar.',
        cancelButtonText: 'No, seguir comprando.',
        allowOutsideClick: false, 
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Compra confirmada!',
            'Formulario final a continuación.',
            'success')
            main.innerHTML = "";
            const finCompra = document.createElement("section")
            finCompra.className = "finCompra";
            finCompra.innerHTML = `<h3>Completar formulario para finalizar la compra.</h3>
            <p>El total de la compra es de <span>$${total}</span>.</p>
            <div class="form">                
                <div class="column">  
                    <label for="mail">EMAIL</label>          
                    <input type="email" class="form-control mail" placeholder="juan.perez@gmail.com" aria-label="mail required">                
                    <label for="inputAddress" class="form-label">DIRECCION</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Calle Falsa 123" required>                
                    <label for="tel">TELEFONO</label>
                    <input class="field" type="number" name="tel" id="tel" autocomplete="off" placeholder="1123456789" required>                    
                    <button class="btn btn-primary" onClick="validarForm()" id="send">Enviar</button>                
                </div> 
            </div> 
            <p>Por favor chequear que los datos sean correctos. Enviaremos un email con el resumen de la compra en el cual se especificará el día y horario de entrega en el domicilio proporcionado.</p>
            `
        main.appendChild(finCompra);    
          
        } else if (          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Continuando compra',
            'Puede seguir eligiendo productos.',
            'info'
          )
          seguirComprando()
        }
      })          
};
function validarForm(){
    let mail = document.querySelector(".mail").value;
    let direc = document.querySelector("#inputAddress").value;
    let tel = document.querySelector("#tel").value;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!mail || !direc || !tel){
        Swal.fire({
            icon: 'error',
            title: '¡Faltan datos!',
            text: 'Ingrese todos los datos solicitados.', 
            allowOutsideClick: false,       
          }); 
    } else{
        (mail.match(regex)&&tel.length>5) ? saludoFinal() : Swal.fire('Es necesario un email/tel correcto');
    };
};
function saludoFinal(){
    let mail = document.querySelector(".mail").value;   
    let usuario = JSON.parse(sessionStorage.getItem("cliente"));
    main.innerHTML = "";
    const saludoFinal = document.createElement("div")
    saludoFinal.className = "finCompra";
    saludoFinal.innerHTML = `<h3>¡¡Muchas gracias <span>${usuario.nombre}</span>!!</h3> 
    <img src="./imagenes/brindis.jpg" alt="imagen brindis saludo final" class="img-final img-fluid">
    <p>Recibirás el resumen de la compra al email <span>${mail}</span>.</p>
    <p>¡Hasta la próxima!</p>`
    main.appendChild(saludoFinal)
    carrito=[];
    total = 0;
    storage(carrito); 
    cartBoton = document.querySelector("#btnCart");
    cartBoton.remove();
};