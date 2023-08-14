class Producto{
    constructor(id, img, nombre, precio,){
        this.id= id
        this.img= img
        this.nombre=nombre
        this.precio=precio
    }
   
}

let hamburguesa_1= new Producto (1, "imagenes/hamburger_01.jpg", "Hamburguesa 'la cocina'", 300)
let hamburguesa_2= new Producto (2, "imagenes/hamburger_02.jpg", "Hamburguesa 'Special'", 250)
let hamburguesa_3= new Producto (3, "imagenes/hamburger_03.jpg", "Hamburguesa 'Robusta'", 350)
let hamburguesa_4= new Producto (4, "imagenes/hamburger_04.jpg", "Hamburguesa 'Imbatible'", 400)
let hamburguesa_5= new Producto (5, "imagenes/hamburger_05.jpg", "Hamburguesa 'Delicius'", 450)

let pizza_1= new Producto (6, "imagenes/pizza_01.jpg", "Pizza Muzzarela", 300)
let pizza_2= new Producto (7, "imagenes/pizza_02.jpg", "Pizza Cuatro quesos", 350)
let pizza_3= new Producto (8, "imagenes/pizza_03.jpg", "Pizza Pepperoni", 370)
let pizza_4= new Producto (9, "imagenes/pizza_04.jpg", "Pizza Margherita", 360)
let pizza_5= new Producto (10, "imagenes/pizza_05.jpg", "Pizza Marinara", 320)

let empanada_1= new Producto (11, "imagenes/empanadas_01.jpg", "Empanada capresse", 110)
let empanada_2= new Producto (12, "imagenes/empanadas_02.jpg", "Empanada calabresa", 110)
let empanada_3= new Producto (13, "imagenes/empanadas_03.jpg", "Empanada apolitana", 110)
let empanada_4= new Producto (14, "imagenes/empanadas_04.jpg", "Empanada Arabe", 110)
let empanada_5= new Producto (15, "imagenes/empanadas_05.jpg", "Empanada Tucumana", 110)

let cafe_1= new Producto (16, "imagenes/caffe_01.jpg", "Cafe corto", 30)
let cafe_2= new Producto (17, "imagenes/caffe_02.jpg", "Cafe Largo", 50)
let cafe_3= new Producto (19, "imagenes/capuccino.jpeg", "Cafe Cappuccino", 80)


let medialuna_1= new Producto (21, "imagenes/medialuna_01.jpg", "Media Lunas", 45)

let bebida_1= new Producto(22, "imagenes/coca_cola.jpg", "Bebidas: Coca Cola", 180)
let bebida_2= new Producto(23, "imagenes/SPRITE-COMUN.jpg", "Bebidas: Sprite", 180)
let bebida_3= new Producto(24, "imagenes/paso.webp", "Bebidas: Pomelo", 180)
let bebida_4= new Producto(25, "imagenes/patricia.jpg", "Bebidas: Patricia", 180)
let bebida_5= new Producto(26, "imagenes/pilsen0.jpg", "Bebidas: Pilsen 0", 180)


let productos=[
    hamburguesa_1,hamburguesa_2,hamburguesa_3,hamburguesa_4,hamburguesa_5,
    pizza_1,pizza_2,pizza_3,pizza_4,pizza_5,
    empanada_1,empanada_2,empanada_3,empanada_4,empanada_5,
    cafe_1,cafe_2,cafe_3,
    medialuna_1,
    bebida_1,
    bebida_2,
    bebida_3,
    bebida_4,
    bebida_5
]

let main= document.querySelector(".principal")
let carrito=[]



function agregarAlCarrito(producto) {//agrega elementos a el array carrito
    carrito.push(producto);
    numeroCarrito()
    Toastify({
        text: `"${producto.nombre}" ha sido agregado al carrito.`,
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "top",
        position: 'right',
      }).showToast();
   localStorage.setItem("carrito", JSON.stringify(carrito));
}

let header=document.querySelector(".header")
let imagenCarrito=document.querySelector(".carrito")




function numeroCarrito() {
    let icoCarrito = document.querySelector(".ico-carrito");
    if (!icoCarrito) {
      icoCarrito = document.createElement("div");
      icoCarrito.classList.add("ico-carrito");
      imagenCarrito.appendChild(icoCarrito);
    }
    icoCarrito.innerHTML = `<p>${carrito.length}</p>`;
  
    let productosDiv = document.createElement("div");
    productosDiv.innerHTML = `<h3>Lista de Productos</h3><ul>${carrito
      .map(
        (producto, index) =>
          `<li>${producto.nombre} - Precio: $${producto.precio} <button class="remove-btn" data-index="${index}">Eliminar</button></li>`
      )
      .join("")}</ul>`;
  
    btnCarrito.addEventListener("click", () => {
      Swal.fire({
        html: productosDiv,
        confirmButtonText: "Cerrar",
        didOpen: () => {
          const removeBtns = document.querySelectorAll(".remove-btn");
          removeBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              const index = e.target.dataset.index;
              Swal.fire({
                title: "Eliminar producto",
                text: "¿Estás seguro de eliminar este producto del carrito?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  carrito.splice(index, 1);
                  numeroCarrito();
                  Swal.fire(
                    "Eliminado",
                    "El producto ha sido eliminado del carrito",
                    "success"
                  );
                }
              });
            });
          });
        },
      });
    });
  }
let btnCarrito=document.querySelector(".icono-carrito")



function recuperarCarrito() {
    const carritoData = localStorage.getItem("carrito");
    if (carritoData) {
      carrito = JSON.parse(carritoData);
    } else {
      carrito = [];
    }
    numeroCarrito();
  }
  
  recuperarCarrito();


    productos.forEach( e => {//crea todas las tarjetas en el main
        let tarjeta= document.createElement("div")
        let imagen=document.createElement("img")
        let parrafo=document.createElement("p")
        let precio=document.createElement("p")
        let boton=document.createElement("button")
        parrafo.innerText=e.nombre
        imagen.src=e.img
        precio.innerText=e.precio
        boton.innerText="Agregar"
        tarjeta.classList.add("tarjetas")
        imagen.classList.add("imagenes")
        boton.classList.add("btn")
        main.appendChild(tarjeta)
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(parrafo)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(boton)

        boton.addEventListener("click", () => {//llama a la funcion y le pasa como parametro la iteracion 
            agregarAlCarrito(e); 
        })
    });

    
   


    function filtrarProductos() {
        const input = buscador.value.toLowerCase();
      
        const productosFiltrados = productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(input)
        );
        if(productosFiltrados.length !== 0){
      
        const principalDiv = document.querySelector(".principal");
        principalDiv.innerHTML = "";
      
        productosFiltrados.forEach((producto) => {
          const productoDiv = document.createElement("div");
          productoDiv.className = "tarjetas";
          productoDiv.innerHTML = `
            <h3 class="titulo">${producto.nombre}</h3>
            <img class="imagenes" src="${producto.img}" alt="${producto.nombre}">
            <p class="precio">Precio: $${producto.precio}</p>
            <button class="btn" > Agregar </button> `
            

          principalDiv.appendChild(productoDiv);
        })}else{
            swal.fire("No hay coincidencias")
        };

      }
      
      const buscador = document.querySelector(".buscador");
      const btnBuscar = document.querySelector(".btn-buscar");
      
      btnBuscar.addEventListener("click", () => {
        filtrarProductos();
      });

      