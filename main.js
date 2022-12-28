/** Concesionaria Americas**/

class repuesto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const bombaDir = new repuesto(1, "Bomba Direccion", 256500, "img/piezaBombaDir.jpg");
const bombaRef = new repuesto(2, "Bomba Refrigerante", 86000, "img/piezaBombaRef.jpg");
const bombaUrea = new repuesto(3, "Bomba Urea", 189500, "img/piezaBombaUrea.jpg");
const desumificador = new repuesto(4, "Desumificador", 17400, "img/piezaDesumificador.jpg");
const embragueCompleto = new repuesto(5, "Embrague Completo", 756500, "img/piezaEmbrague.jpg");
const faroAnt = new repuesto(6, "Faro Antiniebla", 32250, "img/piezaFaroAnt.jpg");
const faroPost = new repuesto(7, "Faro Posterior", 45200, "img/piezaFaroTras.jpg");
const filtroAire = new repuesto(8, "Filtro Aire", 24100, "img/piezaFiltroAire.jpg");
const radiador = new repuesto(9, "Radiador", 295000, "img/piezaRadiador.jpg");
const tensor = new repuesto(10, "Tensor Correa", 36500, "img/piezaTensorCorrea.jpg");
const termostato = new repuesto(11, "Termostato", 28200, "img/piezaTermostato.jpg");
const tornillo = new repuesto(12, "Tornillo Rueda", 6200, "img/piezaTornillo.jpg");
const turbo = new repuesto(13, "Turbocompresor", 450000, "img/piezaTurbo.jpg");
const ventilador = new repuesto(14, "Ventilador Motor", 265200, "img/piezaVentilador.jpg");

//Array catálogo de repuestos: 

const repuestos = [bombaDir, bombaRef, bombaUrea, desumificador, embragueCompleto, faroAnt, faroPost, filtroAire, radiador,  
tensor, termostato, tornillo, turbo, ventilador];

//Array de Carrito:

let carrito = []; 

//Carrito desde localstorage:

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modif DOM:

const contenedorrepuestos = document.getElementById("contenedorrepuestos");

//Función mostrar los repuestos: 

const mostrarrepuestos = () => {
    repuestos.forEach( repuesto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${repuesto.img}" class="card-img-top imgrepuestos" alt="${repuesto.nombre}">
                    <div class= "card-body">
                        <h5>${repuesto.nombre}</h5>
                        <p> ${repuesto.precio} </p>
                        <button class="btn colorBoton" id="boton${repuesto.id}" > Agregar al Carrito </button>
                    </div>
                </div>
                        `
        contenedorrepuestos.appendChild(card);

        //Agregar repuestos al carrito: 
        const boton = document.getElementById(`boton${repuesto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(repuesto.id);
        })
    })
}

mostrarrepuestos();

//Función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const repuestoEnCarrito = carrito.find(repuesto => repuesto.id === id);
    if(repuestoEnCarrito) {
        repuestoEnCarrito.cantidad++;
    } else {
        const repuesto = repuestos.find(repuesto => repuesto.id === id);
        carrito.push(repuesto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

//Mostrar carrito: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

//Función mostrar carrito: 

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(repuesto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${repuesto.img}" class="card-img-top imgrepuestos" alt="${repuesto.nombre}">
                    <div class= "card-body">
                        <h5>${repuesto.nombre}</h5>
                        <p> ${repuesto.precio} </p>
                        <p> ${repuesto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${repuesto.id}" > Eliminar repuesto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

        //Eliminar repuestos del carrito: 
        const boton = document.getElementById(`eliminar${repuesto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(repuesto.id);
        })

    })
    calcularTotal();
}

//Función eliminar el repuesto del carrito: 

const eliminarDelCarrito = (id) => {
    const repuesto = carrito.find(repuesto => repuesto.id === id);
    const indice = carrito.indexOf(repuesto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Función eliminar todo del carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    
    localStorage.clear();
}

//Mostrar total de la compra:

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(repuesto => {
        totalCompra += repuesto.precio * repuesto.cantidad;
        
    })
    total.innerHTML = ` es: $${totalCompra}`;
}