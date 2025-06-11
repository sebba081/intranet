//clase de alumno 
const { Alumno: AlumnoModel } = require('../../src/database/models');

class Alumno {
  constructor(id, usuario_id, nombre, apellido, dni, fecha_nacimiento, carrera) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fecha_nacimiento = fecha_nacimiento;
    this.carrera = carrera;
  }

  // Método para guardar un alumno en la base de datos
  async save() {
    try {
      const alumno = await AlumnoModel.create({
        usuario_id: this.usuario_id,
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        fecha_nacimiento: this.fecha_nacimiento,
        carrera: this.carrera
      });
      this.id = alumno.id; // Actualizar el ID del objeto
      return alumno;
    } catch (error) {
      console.error('Error al guardar el alumno:', error);
      throw error;
    }
  }

  // Método para encontrar un alumno por ID
  static async findById(id) {
    try {
      const alumno = await AlumnoModel.findByPk(id);
      if (alumno) {
        return new Alumno(
          alumno.id,
          alumno.usuario_id,
          alumno.nombre,
          alumno.apellido,
          alumno.dni,
          alumno.fecha_nacimiento,
          alumno.carrera
        );
      }
      return null;
    } catch (error) {
      console.error('Error al encontrar el alumno:', error);
      throw error;
    }
  }

  // Otros métodos de lógica de negocio pueden ir aquí
}

module.exports = Alumno;