class Producto {
  constructor(id, img, nombre, precio, categoria) {
    this.id = id;
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }
}

let hamburguesa_1 = new Producto(
  1,
  "imagenes/hamburger_01.jpg",
  "Hamburguesa 'la cocina'",
  300,
  "hamburguesa"
);
let hamburguesa_2 = new Producto(
  2,
  "imagenes/hamburger_02.jpg",
  "Hamburguesa 'Special'",
  250,
  "hamburguesa"
);
let hamburguesa_3 = new Producto(
  3,
  "imagenes/hamburger_03.jpg",
  "Hamburguesa 'Robusta'",
  350,
  "hamburguesa"
);
let hamburguesa_4 = new Producto(
  4,
  "imagenes/hamburger_04.jpg",
  "Hamburguesa 'Imbatible'",
  400,
  "hamburguesa"
);
let hamburguesa_5 = new Producto(
  5,
  "imagenes/hamburger_05.jpg",
  "Hamburguesa 'Delicius'",
  450,
  "hamburguesa"
);

let pizza_1 = new Producto(
  6,
  "imagenes/pizza_01.jpg",
  "Pizza Muzzarela",
  300,
  "pizza"
);
let pizza_2 = new Producto(
  7,
  "imagenes/pizza_02.jpg",
  "Pizza Cuatro quesos",
  350,
  "pizza"
);
let pizza_3 = new Producto(
  8,
  "imagenes/pizza_03.jpg",
  "Pizza Pepperoni",
  370,
  "pizza"
);
let pizza_4 = new Producto(
  9,
  "imagenes/pizza_04.jpg",
  "Pizza Margherita",
  360,
  "pizza"
);
let pizza_5 = new Producto(
  10,
  "imagenes/pizza_05.jpg",
  "Pizza Marinara",
  320,
  "pizza"
);

let empanada_1 = new Producto(
  11,
  "imagenes/empanadas_01.jpg",
  "Empanada capresse",
  110,
  "empanada"
);
let empanada_2 = new Producto(
  12,
  "imagenes/empanadas_02.jpg",
  "Empanada calabresa",
  110,
  "empanada"
);
let empanada_3 = new Producto(
  13,
  "imagenes/empanadas_03.jpg",
  "Empanada Napolitana",
  110,
  "empanada"
);
let empanada_4 = new Producto(
  14,
  "imagenes/empanadas_04.jpg",
  "Empanada Arabe",
  110,
  "empanada"
);
let empanada_5 = new Producto(
  15,
  "imagenes/empanadas_05.jpg",
  "Empanada Tucumana",
  110,
  "empanada"
);

let cafe_1 = new Producto(
  16,
  "imagenes/caffe_01.jpg",
  "Cafe corto",
  30,
  "cafe"
);
let cafe_2 = new Producto(
  17,
  "imagenes/caffe_02.jpg",
  "Cafe Largo",
  50,
  "cafe"
);
let cafe_3 = new Producto(
  19,
  "imagenes/capuccino.jpeg",
  "Cafe Cappuccino",
  80,
  "cafe"
);

let medialuna_1 = new Producto(
  21,
  "imagenes/medialuna_01.jpg",
  "Media Lunas",
  50,
  "media luna"
);

let bebida_1 = new Producto(
  22,
  "imagenes/coca_cola.jpg",
  "Bebidas: Coca Cola",
  180,
  "bebida"
);
let bebida_2 = new Producto(
  23,
  "imagenes/SPRITE-COMUN.jpg",
  "Bebidas: Sprite",
  180,
  "bebida"
);
let bebida_3 = new Producto(
  24,
  "imagenes/paso.webp",
  "Bebidas: Pomelo",
  180,
  "bebida"
);
let bebida_4 = new Producto(
  25,
  "imagenes/patricia.jpg",
  "Bebidas: Patricia",
  180,
  "bebida"
);
let bebida_5 = new Producto(
  26,
  "imagenes/pilsen0.jpg",
  "Bebidas: Pilsen 0",
  180,
  "bebida"
);

let productos = [
  hamburguesa_1,
  hamburguesa_2,
  hamburguesa_3,
  hamburguesa_4,
  hamburguesa_5,
  pizza_1,
  pizza_2,
  pizza_3,
  pizza_4,
  pizza_5,
  empanada_1,
  empanada_2,
  empanada_3,
  empanada_4,
  empanada_5,
  cafe_1,
  cafe_2,
  cafe_3,
  medialuna_1,
  bebida_1,
  bebida_2,
  bebida_3,
  bebida_4,
  bebida_5,
];

async function cargarProductosDesdeJSONLocal() {
  try {
    const response = await fetch('productos.json');
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    return [];
  }
}

async function cargarYMostrarProductos() {
  const productos = await cargarProductosDesdeJSONLocal();
  borrarContenido(document.querySelector('.principal')); // Borra el contenido actual
  productos.forEach(producto => {
    const productoDiv = crearTarjeta(producto);
    document.querySelector('.principal').appendChild(productoDiv);
  });
}


cargarYMostrarProductos();



let main = document.querySelector(".principal");
let carrito = [];

let header = document.querySelector(".header");
let imagenCarrito = document.querySelector(".carrito");

let btnCarrito = document.querySelector(".icono-carrito");

function agregarAlCarrito(producto) {
  //agrega elementos a el array carrito
  carrito.push(producto);
  numeroCarrito();
  Toastify({
    text: `"${producto.nombre}" ha sido agregado al carrito.`,
    duration: 1500,
    gravity: "top",
    position: "right",
  }).showToast();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  numeroCarrito();
}

function numeroCarrito() {
  let icoCarrito = document.querySelector(".ico-carrito");
  if (!icoCarrito) {
    icoCarrito = document.createElement("div");
    icoCarrito.classList.add("ico-carrito");
    imagenCarrito.appendChild(icoCarrito);
  }
  icoCarrito.innerHTML = `<p class='subindice'>${carrito.length}</p>`;
}

function mostrarElementosDelCarrito(productos) {
  let divprincipal = document.querySelector(".principal");
  let divCarrito = document.querySelector(".divCarrito");
  let elementosCarrito = document.querySelector(".elementosCarrito");

  borrarContenido(divprincipal);
  borrarContenido(elementosCarrito);
  let totalCarrito = calcularCarrito();

  if (productos.length === 0) {
    divprincipal.innerHTML = "<p class='vacio'>El carrito esta vacio</p>";
    let subindiceCarrito = document.querySelector(".ico-carrito");
    borrarContenido(subindiceCarrito);
    return;
  }
  let divTituloCarrito = document.querySelector(".titulo-carrito");
  if (!divTituloCarrito) {
    let divTituloCarrito = document.createElement("div");
    divTituloCarrito.classList.add("titulo-carrito");
    let parrafoTotalCarrito = document.createElement("p");
    parrafoTotalCarrito.classList.add("suma-carrito");
    parrafoTotalCarrito.textContent = `El total de su compra es: $${totalCarrito}`;
    divTituloCarrito.innerHTML = "<h1>Este es tu carrito</h1>";
    divCarrito.appendChild(divTituloCarrito);
    divTituloCarrito.appendChild(parrafoTotalCarrito);
  }

  productos.forEach((prod, index) => {
    let productosCarrito = crearTarjeta(prod);
    let btnQuitar = document.createElement("button");
    btnQuitar.textContent = "Quitar";
    btnQuitar.setAttribute("id", "btn-carrito");
    let actualizarPrecio = document.querySelector(".suma-carrito");
    actualizarPrecio.textContent = `El total de su compra es: $${totalCarrito}`;

    btnQuitar.addEventListener("click", () => {
      carrito.splice(index, 1);
      mostrarElementosDelCarrito(carrito);
      if (carrito.length == 0) {
        borrarContenido(divCarrito);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    productosCarrito.appendChild(btnQuitar);
    elementosCarrito.appendChild(productosCarrito);
  });

  let btnAgregarOff = document.querySelectorAll(".btn");
  btnAgregarOff.forEach((btn) => {
    btn.classList.remove("btn");
    btn.classList.add("btn-carrito-off");
  });

  let tarjetasCarrito = document.querySelectorAll(".tarjetas");

  tarjetasCarrito.forEach((tarje) => {
    tarje.classList.remove("tarjetas");
    tarje.classList.add("tarjetas-carrito");
  });

  let imagenesTarjeasCarrito = document.querySelectorAll(".imagenes");
  imagenesTarjeasCarrito.forEach((img) => {
    img.classList.remove("imagenes");
    img.classList.add("imagenes-tarjetas-carrito");
  });
  let formulario = document.createElement("div");
  formulario.classList.add("divForm");
  formulario.innerHTML = `
  <h2 class="titulo-form">Datos de envio</h2><form class="form"><label class="lable" for="nombre">Nombre:</label>
  <input class="input" type="text" id="nombre" name="nombre" required><br>

  <label class="lable" for="apellido">Apellido:</label>
  <input class="input" type="text" id="apellido" name="apellido" required><br>

  <label class="lable" for="direccion">Dirección:</label>
  <input class="input" type="text" id="direccion" name="direccion" required><br>

  <label class="lable" for="celular">Celular:</label>
  <input class="input" type="tel" id="celular" name="celular"  required>
 <br>

  <button class="btn" type="submit">Enviar</button>
  </form>
`;

  elementosCarrito.appendChild(formulario);

  numeroCarrito();

  let btnCarrito = document.querySelector(".btn");
  let nombre = document.querySelector("#nombre");
  let direccion = document.querySelector("#direccion");

  btnCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    enviarPedido(nombre.value, direccion.value);
  });

  function enviarPedido(nombre, direccion) {
    Swal.fire(`Su pedido sera enviado a: ${nombre} En la calle: ${direccion}`);
    borrarContenido(elementosCarrito);
    borrarContenido(divCarrito);
    localStorage.removeItem("carrito");
    carrito = [];
    numeroCarrito();
    cargarTarjetasIniciales();
  }
}

btnCarrito.addEventListener("click", () => {
  mostrarElementosDelCarrito(carrito);
});

function calcularCarrito() {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

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

function crearTarjeta(producto) {
  // crea la estructura de las tarjetas
  const tarjeta = document.createElement("div");
  const imagen = document.createElement("img");
  const parrafo = document.createElement("p");
  const precio = document.createElement("p");
  const boton = document.createElement("button");

  parrafo.innerText = producto.nombre;
  imagen.src = producto.img;
  precio.innerText = producto.precio;
  boton.innerText = "Agregar";

  tarjeta.classList.add("tarjetas");
  imagen.classList.add("imagenes");
  boton.classList.add("btn");

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(parrafo);
  tarjeta.appendChild(precio);
  tarjeta.appendChild(boton);

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto);
  });

  return tarjeta;
}

function cargarTarjetasIniciales() {
  // agrega el contienido del array productos a las tarjetas
  const principalDiv = document.querySelector(".principal");
  productos.forEach((producto) => {
    const productoDiv = crearTarjeta(producto);
    principalDiv.appendChild(productoDiv);
  });
}

cargarTarjetasIniciales();

function filtrarProductos(productos, filtro) {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
}

function borrarContenido(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function borrarYAgregaProductos(productos) {
  const principalDiv = document.querySelector(".principal");
  borrarContenido(principalDiv);

  if (productos.length === 0) {
    swal.fire("No hay coincidencias");
    return;
  }

  productos.forEach((producto) => {
    const productoDiv = crearTarjeta(producto);
    principalDiv.appendChild(productoDiv);
  });
}

const buscador = document.querySelector(".buscador");
const btnBuscar = document.querySelector(".btn-buscar");

btnBuscar.addEventListener("click", () => {
  const filtro = buscador.value;
  const productosFiltrados = filtrarProductos(productos, filtro);
  borrarYAgregaProductos(productosFiltrados);
});

const btnAside = document.querySelectorAll(".btn-aside");

btnAside.forEach((element) => {
  element.addEventListener("click", () => {
    const categoria = element.getAttribute("data-categoria");
    let divCarrito = document.querySelector(".elementosCarrito");
    filtrarYMostrarPorCategoria(categoria);
    borrarContenido(divCarrito);
  });
});

function filtrarYMostrarPorCategoria(categoria) {
  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === categoria
  );
  borrarYAgregaProductos(productosFiltrados);
  let divTituloCarrito = document.querySelector(".titulo-carrito");
  if (divTituloCarrito) {
    divTituloCarrito.style.display = "none";
  }
  btnCarrito.addEventListener("click", () => {
    if (divTituloCarrito) {
      divTituloCarrito.style.display = "block"; // Mostrar el título nuevamente
    }
    mostrarElementosDelCarrito(carrito);
  });
}
