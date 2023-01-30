let productos = [
  {
    id: 1,
    nombre: "Arnes Pride",
    categoria: "arneses",
    precio: 5500,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-pride.jpg",
  },
  {
    id: 2,
    nombre: "Arnes con cadenas",
    categoria: "arneses",
    precio: 7000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-cadenas.jpg",
  },
  {
    id: 3,
    nombre: "Arnes negro",
    categoria: "arneses",
    precio: 6000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-negro.jpg",
  },
  {
    id: 4,
    nombre: "Arnes rojo",
    categoria: "arneses",
    precio: 5500,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-rojo.jpg",
  },
  {
    id: 5,
    nombre: "Cadenas Top",
    categoria: "cadenas",
    precio: 7000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-top.jpg",
  },
  {
    id: 6,
    nombre: "Arnes blanco abierto",
    categoria: "arneses",
    precio: 7000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-blanco-abierto.png",
  },
  {
    id: 7,
    nombre: "Arnes Soulmate",
    categoria: "arneses",
    precio: 9000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-Soulmate.jpg",
  },
  {
    id: 8,
    nombre: "Arnes blanco",
    categoria: "arneses",
    precio: 6000,
    stock: 20,
    imgUrl: "./imagenes/productos/arnes-blanco.jpg",
  },
];

let carrito = [];
if (localStorage.getItem("carrito")) {
  let carritoEnJSON = localStorage.getItem("carrito");
  carrito = JSON.parse(carritoEnJSON);
}

let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorCarrito = document.getElementById("contenedor-carrito-de-compra");
let buscador = document.getElementById("buscador");
let buscar = document.getElementById("buscar");
buscar.onclick = filtrar;

let verCarrito = document.getElementById("ver-carrito");
verCarrito.addEventListener("click", mostrarOcultarCarrito);

function mostrarOcultarCarrito() {
  contenedorProductos.classList.toggle("ocultar");
  contenedorCarrito.classList.toggle("ocultar");
}

renderizarProductos(productos);
renderizarCarrito(carrito);

function finalizarCompra() {
  localStorage.removeItem("carrito");
  carrito = [];
  renderizarCarrito(carrito);
}

function filtrar() {
  let productosFiltrados;
  if (buscador.value) {
    productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(buscador.value.toLowerCase())
    );
  }
  renderizarProductos(productosFiltrados);
}

function renderizarProductos(arrayDeProductos) {
  contenedorProductos.innerHTML = "";
  arrayDeProductos.forEach((producto) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("producto");
    tarjetaProducto.id = `tarjeta${producto.id}`;

    tarjetaProducto.innerHTML = `
      <div class='producto-imagen'>
        <img src=${producto.imgUrl} />
      </div>
      <div class='contenedor-producto-info'>
        <div class='producto-info'>
          <span class='mt-2'>${producto.nombre}</span>
          <span>$${producto.precio}</span>
        </div>
        <div class='producto-boton-agregar'>
          <button id=agregar${producto.id}>Agregar</button>
        <div>
      </div>
    `;

    contenedorProductos.append(tarjetaProducto);

    let boton = document.getElementById("agregar" + producto.id);
    boton.onclick = agregarAlCarrito;
  });
}

function agregarAlCarrito(e) {
  let id = e.target.id.slice(7);
  console.log(id);
  let productoBuscado = productos.find((producto) => producto.id == id);
  let productoEnCarrito = carrito.find(
    (producto) => producto.id == productoBuscado.id
  );

  if (productoEnCarrito) {
    let posicionProducto = carrito.findIndex(
      (producto) => producto == productoEnCarrito
    );
    carrito[posicionProducto].unidades++;
    carrito[posicionProducto].subtotal =
      carrito[posicionProducto].precio * carrito[posicionProducto].unidades;
  } else {
    productoBuscado.unidades = 1;
    productoBuscado.subtotal = productoBuscado.precio;
    carrito.push(productoBuscado);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito(carrito);
}

function renderizarCarrito(productosEnCarrito) {
  contenedorCarrito.innerText = "";
  productosEnCarrito.forEach((producto) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("itemCarrito");
    tarjetaProducto.innerHTML += `
      <h3>${producto.nombre}</h3>
      <p>${producto.unidades}</p>
      <p>${producto.subtotal}</p>
      <button onClick=eliminarProductoDelCarrito(eliminar${producto.id}) id=eliminar${producto.id}>Eliminar</button>
    `;
    contenedorCarrito.appendChild(tarjetaProducto);
  });

  contenedorCarrito.innerHTML += `
    <button id="comprar">COMPRAR</button>
  `;
  let comprar = document.getElementById("comprar");
  comprar.addEventListener("click", finalizarCompra);
}

function eliminarProductoDelCarrito(e) {
  let id = e.id.substring(8);
  let posProdAEliminar = carrito.findIndex((prod) => prod.id == id);
  carrito.splice(posProdAEliminar, 1);
  renderizarCarrito(carrito);
}

let checkBoxs = document.getElementsByClassName("inputFiltro");
for (const checkBox of checkBoxs) {
  checkBox.onclick = filtrarPorCategoria;
}

let ropa = document.getElementById("arneses");
ropa.onclick = filtrarPorCategoria;

let deporte = document.getElementById("cadenas");
deporte.onclick = filtrarPorCategoria;

function filtrarPorCategoria() {
  let filtros = [];
  for (const checkBox of checkBoxs) {
    if (checkBox.checked) {
      filtros.push(checkBox.id);
    }
  }
  let productosFiltrados = productos.filter((producto) =>
    filtros.includes(producto.categoria)
  );
  renderizarProductos(productosFiltrados);
  if (filtros.length == 0) {
    renderizarProductos(productos);
  }
}
