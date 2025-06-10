class Curso {
  constructor(id, materia_id, profesor_id, anio_academico, cuatrimestre, cupo) {
    this.id = id;
    this.materia_id = materia_id;
    this.profesor_id = profesor_id;
    this.anio_academico = anio_academico;
    this.cuatrimestre = cuatrimestre;
    this.cupo = cupo;
  }
}

module.exports = Curso;