class Usuario {
  constructor(id, nombre, correo, contrasena, admin) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.admin = admin;
  }
}

// Lista inicial de usuarios
const listaUsuarios = [
  new Usuario("U001", "Juan Pérez", "juanperez@mail.com", "1234", true),
  new Usuario("U002", "María González", "maria@mail.com", "abcd", false),
  new Usuario("U003", "Pedro Ramírez", "pedro@mail.com", "qwerty", false),
];

// Exportar a global
window.listaUsuarios = listaUsuarios;
console.log("Usuario.js cargado, listaUsuarios:", window.listaUsuarios);
