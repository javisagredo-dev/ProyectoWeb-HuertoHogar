document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-box form");
  const emailInput = document.getElementById("txt_email");
  const passwordInput = document.getElementById("txt_password");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const errors = [];

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // === VALIDACIÓN DE EMAIL ===
    if (!email) {
      errors.push("El correo es obligatorio.");
    } else {
      const emailRegex = /^[\w._%+-]+@huertohogar\.cl$/;
      if (!emailRegex.test(email)) {
        errors.push("El correo debe ser institucional @huertohogar.cl");
      }
    }

    // === VALIDACIÓN DE CONTRASEÑA ===
    if (!password) {
      errors.push("La contraseña es obligatoria.");
    } else if (password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    // === RESULTADO ===
    if (errors.length > 0) {
      showErrors(errors);
    } else {
      clearErrors();
      Swal.fire({
        icon: "success",
        title: "¡Acceso concedido!",
        text: "Redirigiendo al panel de administración...",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        window.location.href = "home_admin.html";
      });
    }
  });

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
