document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const mensajeInput = document.getElementById("mensaje");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita el envío automático

    const errors = [];
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    // ================= VALIDACIÓN NOMBRE =================
    if (!nombre) {
      errors.push("El nombre es obligatorio.");
    } else if (nombre.length > 50) {
      errors.push("El nombre no puede superar los 50 caracteres.");
    }

    // ================= VALIDACIÓN EMAIL =================
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
    }

    // ================= VALIDACIÓN MENSAJE =================
    if (!mensaje) {
      errors.push("El mensaje es obligatorio.");
    } else if (mensaje.length > 500) {
      errors.push("El mensaje no puede superar los 500 caracteres.");
    }

    // ================= MOSTRAR RESULTADOS =================
    if (errors.length > 0) {
      showErrors(errors);
    } else {
      clearErrors();
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `Gracias ${nombre}, tu mensaje ha sido enviado.`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        form.reset(); // limpia el formulario
      });
    }
  });

  // ============= FUNCIÓN PARA MOSTRAR ERRORES =============
  function showErrors(errors) {
    clearErrors();
    const errorContainer = document.createElement("div");
    errorContainer.className = "alert alert-danger mt-3";
    errorContainer.innerHTML = errors.join("<br>");
    form.appendChild(errorContainer);
  }

  // ============= FUNCIÓN PARA LIMPIAR ERRORES =============
  function clearErrors() {
    const existingError = form.querySelector(".alert-danger");
    if (existingError) existingError.remove();
  }
});
