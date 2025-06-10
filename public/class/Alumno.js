//clase de alumno 
const Usuario = require('./Usuario');

class Alumno extends Usuario {
  constructor(id, usuario_id, nombre, apellido, dni, fecha_nacimiento, carrera) {
    super(usuario_id);
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fecha_nacimiento = fecha_nacimiento;
    this.carrera = carrera;
  }
}

module.exports = Alumno;