class Horario {
  constructor(id, curso_id, aula_id, dia, hora_inicio, hora_fin) {
    this.id = id;
    this.curso_id = curso_id;
    this.aula_id = aula_id;
    this.dia = dia;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
  }
}

module.exports = Horario;