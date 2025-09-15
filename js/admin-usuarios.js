document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  const btnAgregar = document.querySelector(".btn-success");

  let listaUsuarios =
    JSON.parse(localStorage.getItem("listaUsuarios")) ||
    window.listaUsuarios ||
    [];

  const emailRegex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  function guardarLocalStorage() {
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
  }

  function renderUsuarios() {
    tbody.innerHTML = "";

    listaUsuarios.forEach((usuario, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.contrasena}</td>
        <td>${usuario.admin ? "Sí" : "No"}</td>
        <td class="table-actions">
          <button class="btn btn-sm btn-primary mb-1 btn-editar">Editar</button>
          <button class="btn btn-sm btn-danger mb-1 btn-eliminar">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".btn-eliminar").addEventListener("click", () => {
        if (confirm(`¿Eliminar el usuario "${usuario.nombre}"?`)) {
          listaUsuarios.splice(index, 1);
          guardarLocalStorage();
          renderUsuarios();
        }
      });

      tr.querySelector(".btn-editar").addEventListener("click", () => {
        if (tbody.querySelector(".edit-row")) return;

        const editTr = document.createElement("tr");
        editTr.classList.add("edit-row");
        editTr.innerHTML = `
          <td><input type="text" class="form-control" value="${
            usuario.id
          }" disabled></td>
          <td><input type="text" class="form-control" value="${
            usuario.nombre
          }"></td>
          <td><input type="email" class="form-control" value="${
            usuario.correo
          }"></td>
          <td><input type="text" class="form-control" value="${
            usuario.contrasena
          }"></td>
          <td class="text-center">
            <input type="checkbox" class="form-check-input" ${
              usuario.admin ? "checked" : ""
            }>
          </td>
          <td>
            <button class="btn btn-sm btn-success mb-1 btn-guardar">Guardar</button>
            <button class="btn btn-sm btn-secondary mb-1 btn-cancelar">Cancelar</button>
          </td>
        `;
        tr.after(editTr);

        editTr.querySelector(".btn-cancelar").addEventListener("click", () => {
          editTr.remove();
        });

        editTr.querySelector(".btn-guardar").addEventListener("click", () => {
          const nombreInput = editTr.children[1]
            .querySelector("input")
            .value.trim();
          const correoInput = editTr.children[2]
            .querySelector("input")
            .value.trim();
          const contrasenaInput = editTr.children[3]
            .querySelector("input")
            .value.trim();
          const adminInput = editTr.children[4].querySelector("input").checked;

          if (!nombreInput || !correoInput || !contrasenaInput) {
            alert("Todos los campos son obligatorios");
            return;
          }
          if (!emailRegex.test(correoInput)) {
            alert(
              "Correo inválido. Solo se permiten duoc.cl, profesor.duoc.cl y gmail.com"
            );
            return;
          }

          usuario.nombre = nombreInput;
          usuario.correo = correoInput;
          usuario.contrasena = contrasenaInput;
          usuario.admin = adminInput;

          guardarLocalStorage();
          renderUsuarios();
        });
      });
    });
  }

  renderUsuarios();

  btnAgregar.addEventListener("click", () => {
    if (document.querySelector("#tablaUsuarios tbody tr.new-user")) return;

    const tr = document.createElement("tr");
    tr.classList.add("new-user");
    tr.innerHTML = `
      <td><input type="text" id="newId" class="form-control" placeholder="ID"></td>
      <td><input type="text" id="newNombre" class="form-control" placeholder="Nombre"></td>
      <td><input type="email" id="newCorreo" class="form-control" placeholder="Correo"></td>
      <td><input type="text" id="newContrasena" class="form-control" placeholder="Contraseña"></td>
      <td class="text-center">
        <input type="checkbox" id="newAdmin" class="form-check-input">
      </td>
      <td>
        <button class="btn btn-sm btn-success mb-1" id="guardarUsuario">Guardar</button>
        <button class="btn btn-sm btn-secondary mb-1" id="cancelarUsuario">Cancelar</button>
      </td>
    `;
    tbody.prepend(tr);

    document.querySelector("#cancelarUsuario").addEventListener("click", () => {
      tr.remove();
    });

    document.querySelector("#guardarUsuario").addEventListener("click", () => {
      const idInput = document.querySelector("#newId").value.trim();
      const nombreInput = document.querySelector("#newNombre").value.trim();
      const correoInput = document.querySelector("#newCorreo").value.trim();
      const contrasenaInput = document
        .querySelector("#newContrasena")
        .value.trim();
      const adminInput = document.querySelector("#newAdmin").checked;

      if (!idInput || !nombreInput || !correoInput || !contrasenaInput) {
        alert("Todos los campos son obligatorios");
        return;
      }
      if (!emailRegex.test(correoInput)) {
        alert(
          "Correo inválido. Solo se permiten duoc.cl, profesor.duoc.cl y gmail.com"
        );
        return;
      }
      if (listaUsuarios.some((u) => u.id === idInput)) {
        alert("El ID ya existe, debe ser único");
        return;
      }

      const nuevoUsuario = {
        id: idInput,
        nombre: nombreInput,
        correo: correoInput,
        contrasena: contrasenaInput,
        admin: adminInput,
      };

      listaUsuarios.push(nuevoUsuario);
      guardarLocalStorage();
      renderUsuarios();
    });
  });
});
