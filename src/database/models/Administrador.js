const Usuario = require('../../../public/class/Usuario');

class Administrador extends Usuario {
  constructor(id, usuario_id, nombre, apellido) {
    super(usuario_id);
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

module.exports = Administrador;



