const Usuario = require('./Usuario');

class Profesor extends Usuario {
  constructor(id, usuario_id, nombre, apellido, dni, titulo, especialidad) {
    super(usuario_id);
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.titulo = titulo;
    this.especialidad = especialidad;
  }
}

module.exports = Profesor;