class Producto {
  constructor(id, nombre, precio, imagen, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
  abrirModal() {
    document.querySelector(".modal-producto-img").src = this.imagen;
    document.querySelector(".modal-producto-img").alt = this.nombre;
    document.querySelector(".modal-producto-nombre").textContent = this.nombre;
    document.querySelector(".modal-producto-codigo").textContent = "Código: " + this.id;
    document.querySelector(".modal-producto-precio").textContent = "$" + this.precio.toLocaleString() + " CLP";
    document.querySelector(".modal-producto-desc").textContent = this.descripcion;

    const botonModal = document.querySelector(".btn-agregar-carrito");
    botonModal.setAttribute("onclick", `agregarCarrito('${this.id}')`);
  }
}

const listaProductos = [
  new Producto("FR001", "Manzanas Fuji", 1200, "img/manzanas_fuji.jpg", "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o postres."
  ),
  new Producto("FR002", "Naranjas Valencia", 1000, "img/naranjas_valencia.png", "Naranjas Valencia jugosas y frescas, ideales para jugos o ensaladas. Ricas en vitamina C."
  ),
  new Producto("FR003", "Plátanos Cavendish", 800, "img/platanos_cavendish.png", "Plátanos Cavendish dulces, perfectos para batidos, postres o como snack saludable."
  ),
  new Producto("VR001", "Zanahorias Orgánicas", 900, "img/zanahorias_organicas.png", "Zanahorias cultivadas sin pesticidas, frescas y nutritivas, ricas en betacarotenos."
  ),
  new Producto("VR002", "Espinacas Frescas", 700, "img/espinacas_frescas.png", "Espinacas recién cosechadas, ideales para ensaladas, guisos y smoothies verdes."
  ),
  new Producto("VR003", "Pimientos Tricolores", 1500, "img/pimientos_tricolor.png", "Pimientos rojos, verdes y amarillos, frescos y crujientes, perfectos para asar o ensaladas."
  ),
  new Producto("PO001", "Miel Orgánica", 1200, "img/miel_organica.png", "Miel 100% natural, cosechada artesanalmente, ideal para endulzar de manera saludable."
  ),
  new Producto("PO002", "Quinoa Orgánica", 4000, "img/quinoa_organica.png", "Quinoa rica en proteínas y fibra, perfecta para ensaladas, sopas y platos vegetarianos."
  ),
  new Producto("FR004", "Tomates", 700, "img/tomates.png", "Tomates frescos, jugosos y con mucho sabor, ideales para ensaladas o salsas caseras."
  ),
  new Producto("PL001", "Leche Entera", 2000, "img/leche_entera.png", "Leche entera fresca, fuente de calcio y proteínas, ideal para el consumo diario."
  ),
];

//PARA ABRIR EL PRODUCTO EN EL MODAL
function abrirModalProducto(id) {
  const producto = listaProductos.find((p) => p.id == id);
  if (producto) {
    producto.abrirModal();
  }
}

// Esto asegura que listaProductos esté disponible globalmente
window.listaProductos = listaProductos;
console.log("Producto.js cargado, listaProductos:", window.listaProductos);
