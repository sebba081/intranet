class Calificacion {
  constructor(id, inscripcion_id, nota, fecha) {
    this.id = id;
    this.inscripcion_id = inscripcion_id;
    this.nota = nota;
    this.fecha = fecha;
  }
}

module.exports = Calificacion;