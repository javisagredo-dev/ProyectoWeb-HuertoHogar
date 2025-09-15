document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el formulario dentro de la caja de login
  const form = document.querySelector(".login-box form");
  // Obtiene el input del correo
  const emailInput = document.getElementById("txt_email");
  // Obtiene el input de la contraseña
  const passwordInput = document.getElementById("txt_password");

  // Escucha el evento "submit" del formulario
  form.addEventListener("submit", function (event) {
    // Previene que el formulario se envíe automáticamente
    event.preventDefault();

    // Array para guardar todos los mensajes de error
    const errors = [];

    // Obtiene y limpia espacios del correo y la contraseña
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // ================= VALIDACIÓN DE CORREO =================
    if (!email) {

      errors.push("El correo es obligatorio.");
    } else if (email.length > 100) {
      // Si supera los 100 caracteres
      errors.push("El correo no puede superar los 100 caracteres.");
    } else {
      // Expresión regular que acepta solo los dominios permitidos
      const emailRegex =
        /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      // Si no cumple con el patrón → error
      if (!emailRegex.test(email)) {
        errors.push(
          "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );
      }
    }

    // ================= VALIDACIÓN DE CONTRASEÑA =================
    if (!password) {
      // Si la contraseña está vacía
      errors.push("La contraseña es obligatoria.");
    } else if (password.length < 4 || password.length > 10) {
      // Si no está entre 4 y 10 caracteres
      errors.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    // ================= MOSTRAR RESULTADOS =================
    if (errors.length > 0) {
      // Si hay errores → mostrarlos en pantalla
      showErrors(errors);
    } else {
      // Si no hay errores → limpiar mensajes previos
      clearErrors();
      // Simulación de login válido
      // Necesito agregar sweet alert a un modal para que no use espacio
      // de la pagina principal !!!
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Formulario válido. ¡Iniciando sesión!",
        showConfirmButton: false, // No se muestra boton de confirmacion
        timer: 2000, // temporizador en 2 segundos
        toast: true,
      }).then(() => {
        window.location.href = "index.html"; // Lleva a index luego del temporizador
      });
    }
  });

  // ============= FUNCIÓN PARA MOSTRAR ERRORES =============
  function showErrors(errors) {
    // Primero borra errores antiguos para no duplicar
    clearErrors();
    // Crea un <div> que mostrará los errores
    const errorContainer = document.createElement("div");
    // Le da estilo usando clases de Bootstrap
    errorContainer.className = "alert alert-danger mt-3";
    // Junta los mensajes en HTML separados por <br>
    errorContainer.innerHTML = errors.join("<br>");
    // Agrega el div de errores al final del formulario
    form.appendChild(errorContainer);
  }

  // ============= FUNCIÓN PARA LIMPIAR ERRORES =============
  function clearErrors() {
    // Busca si ya existe un mensaje de error
    const existingError = form.querySelector(".alert-danger");
    // Si existe → lo elimina
    if (existingError) {
      existingError.remove();
    }
  }
});
