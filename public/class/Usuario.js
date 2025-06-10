class Usuario {
  constructor(id, correo, password, rol) {
    this.id = id;
    this.correo = correo;
    this.password = password;
    this.rol = rol;
  }
}

module.exports = Usuario;
