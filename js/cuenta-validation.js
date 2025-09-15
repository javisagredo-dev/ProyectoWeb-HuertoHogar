
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-box form");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const correosExistentes = ["test@duoc.cl", "admin@gmail.com"];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = [];
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // ================= VALIDACIÓN DE NOMBRE =================
    if (!nombre) errors.push("El nombre es obligatorio.");
    if (nombre.length > 50)
      errors.push("El nombre no puede superar los 50 caracteres.");

    // ================= VALIDACIÓN DE APELLIDO =================
    if (!apellido) errors.push("El apellido es obligatorio.");
    if (apellido.length > 50)
      errors.push("El apellido no puede superar los 50 caracteres.");

    // ================= VALIDACIÓN DE CORREO =================
    if (!email) {
      errors.push("El correo es obligatorio.");
    } else if (email.length > 100) {
      errors.push("El correo no puede superar los 100 caracteres.");
    } else {
      const emailRegex =
        /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!emailRegex.test(email)) {
        errors.push(
          "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );
      }
      // Comprobar si el correo ya está registrado
      if (correosExistentes.includes(email)) {
        errors.push("El correo ya está registrado.");
      }
    }

    // ================= VALIDACIÓN DE CONTRASEÑA =================
    if (!password) {
      errors.push("La contraseña es obligatoria.");
    } else if (password.length < 4 || password.length > 10) {
      errors.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    // ================= MOSTRAR RESULTADOS =================
    if (errors.length > 0) {
      showErrors(errors);
    } else {
      clearErrors();
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Cuenta creada correctamente.",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        window.location.href = "index.html";
      });
    }
  });

  // ============= FUNCIONES REUTILIZADAS =================
  function showErrors(errors) {
    clearErrors();
    const errorContainer = document.createElement("div");
    errorContainer.className = "alert alert-danger mt-3";
    errorContainer.innerHTML = errors.join("<br>");
    form.appendChild(errorContainer);
  }

  function clearErrors() {
    const existingError = form.querySelector(".alert-danger");
    if (existingError) existingError.remove();
  }
});
