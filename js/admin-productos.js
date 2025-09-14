document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tablaProductos tbody");
  const btnAgregar = document.querySelector(".btn-success");

  // Obtener listaProductos desde localStorage o usar la global si no existe
  let listaProductos =
    JSON.parse(localStorage.getItem("listaProductos")) ||
    window.listaProductos ||
    [];

  // Función para actualizar localStorage
  function guardarLocalStorage() {
    localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
  }

  // Función para renderizar productos
  function renderProductos() {
    tbody.innerHTML = "";

    listaProductos.forEach((producto, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td><img src="${producto.imagen}" alt="${
        producto.nombre
      }" class="img-thumbnail" style="width:80px;"></td>
        <td>${producto.descripcion}</td>
        <td class="table-actions">
          <button class="btn btn-sm btn-primary mb-1 btn-editar">Editar</button>
          <button class="btn btn-sm btn-danger mb-1 btn-eliminar">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);

      // Botón Eliminar
      tr.querySelector(".btn-eliminar").addEventListener("click", () => {
        if (confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
          listaProductos.splice(index, 1); // elimina del array
          guardarLocalStorage(); // guarda en localStorage
          renderProductos(); // vuelve a renderizar tabla
        }
      });

      // Botón Editar
      tr.querySelector(".btn-editar").addEventListener("click", () => {
        if (tbody.querySelector(".edit-row")) return;

        const editTr = document.createElement("tr");
        editTr.classList.add("edit-row");
        editTr.innerHTML = `
          <td><input type="text" class="form-control" value="${producto.id}" disabled></td>
          <td><input type="text" class="form-control" value="${producto.nombre}"></td>
          <td><input type="text" class="form-control" value="${producto.precio}"></td>
          <td><input type="text" class="form-control" value="${producto.imagen}"></td>
          <td><input type="text" class="form-control" value="${producto.descripcion}"></td>
          <td>
            <button class="btn btn-sm btn-success mb-1 btn-guardar">Guardar</button>
            <button class="btn btn-sm btn-secondary mb-1 btn-cancelar">Cancelar</button>
          </td>
        `;
        tr.after(editTr);

        // Cancelar edición
        editTr.querySelector(".btn-cancelar").addEventListener("click", () => {
          editTr.remove();
        });

        // Guardar edición
        editTr.querySelector(".btn-guardar").addEventListener("click", () => {
          const nombreInput = editTr.children[1]
            .querySelector("input")
            .value.trim();
          const precioInput = editTr.children[2]
            .querySelector("input")
            .value.trim();
          const imagenInput = editTr.children[3]
            .querySelector("input")
            .value.trim();
          const descInput = editTr.children[4]
            .querySelector("input")
            .value.trim();

          if (!nombreInput || !precioInput || !imagenInput || !descInput) {
            alert("Todos los campos son obligatorios");
            return;
          }
          if (isNaN(precioInput)) {
            alert("El precio debe ser un número válido");
            return;
          }

          // Actualizar producto en array
          producto.nombre = nombreInput;
          producto.precio = Number(precioInput);
          producto.imagen = imagenInput;
          producto.descripcion = descInput;

          guardarLocalStorage();
          renderProductos();
        });
      });
    });
  }

  // Render inicial
  renderProductos();

  // Agregar nuevo producto
  btnAgregar.addEventListener("click", () => {
    if (document.querySelector("#tablaProductos tbody tr.new-product")) return;

    const tr = document.createElement("tr");
    tr.classList.add("new-product");
    tr.innerHTML = `
      <td><input type="text" id="newId" class="form-control" placeholder="ID"></td>
      <td><input type="text" id="newNombre" class="form-control" placeholder="Nombre"></td>
      <td><input type="text" id="newPrecio" class="form-control" placeholder="Precio"></td>
      <td><input type="text" id="newImagen" class="form-control" placeholder="URL Imagen"></td>
      <td><input type="text" id="newDescripcion" class="form-control" placeholder="Descripción"></td>
      <td class="table-actions">
        <button class="btn btn-sm btn-success mb-1" id="guardarProducto">Guardar</button>
        <button class="btn btn-sm btn-secondary mb-1" id="cancelarProducto">Cancelar</button>
      </td>
    `;
    tbody.prepend(tr);

    document
      .querySelector("#cancelarProducto")
      .addEventListener("click", () => {
        tr.remove();
      });

    document.querySelector("#guardarProducto").addEventListener("click", () => {
      const idInput = document.querySelector("#newId").value.trim();
      const nombreInput = document.querySelector("#newNombre").value.trim();
      const precioInput = document.querySelector("#newPrecio").value.trim();
      const imagenInput = document.querySelector("#newImagen").value.trim();
      const descInput = document.querySelector("#newDescripcion").value.trim();

      if (
        !idInput ||
        !nombreInput ||
        !precioInput ||
        !imagenInput ||
        !descInput
      ) {
        alert("Todos los campos son obligatorios");
        return;
      }
      if (isNaN(precioInput)) {
        alert("El precio debe ser un número válido");
        return;
      }
      if (listaProductos.some((p) => p.id === idInput)) {
        alert("El ID ya existe, debe ser único");
        return;
      }

      const nuevoProducto = {
        id: idInput,
        nombre: nombreInput,
        precio: Number(precioInput),
        imagen: imagenInput,
        descripcion: descInput,
      };

      listaProductos.push(nuevoProducto);
      guardarLocalStorage();
      renderProductos();
    });
  });
});
