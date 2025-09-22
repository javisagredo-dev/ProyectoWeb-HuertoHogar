class ProductoCarrito {
    constructor(id, nombre, precio, cantidad, total, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.total = total;
        this.imagen = imagen;
    }
}

function agregarCarrito(id) {
    const producto = listaProductos.find(p => p.id == id);
    if (producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let productoEnCarrito = carrito.find(p => p.id == id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
            productoEnCarrito.total = productoEnCarrito.cantidad * productoEnCarrito.precio;
        } else {
            const nuevoProducto = new ProductoCarrito(
                producto.id,
                producto.nombre,
                producto.precio,
                1,
                producto.precio,
                producto.imagen
            );
            carrito.push(nuevoProducto);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCantidadNavbar();
    }
}

function actualizarCantidadNavbar() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);

    const badge = document.getElementById("cantidad-carrito");
    if (badge) badge.textContent = totalItems;
}
