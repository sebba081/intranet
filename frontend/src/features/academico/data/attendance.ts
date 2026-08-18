// Tipos y mock data alineados con v_asistencia (schema 6FN)

export interface RegistroAsistencia {
  inscripcion_id: string;
  fecha: string;       // YYYY-MM-DD
  presente: boolean;
  justificada: boolean;
}

// Resumen de asistencia por curso (calculado desde v_asistencia)
export interface ResumenAsistencia {
  curso_id: string;
  curso_nombre: string;
  total_clases: number;
  presentes: number;
  ausentes: number;
  porcentaje: string;
}

export const attendance: ResumenAsistencia[] = [
  { curso_id: "c-001", curso_nombre: "Matemática I",   total_clases: 20, presentes: 18, ausentes: 2, porcentaje: "90%" },
  { curso_id: "c-002", curso_nombre: "Programación Web", total_clases: 20, presentes: 19, ausentes: 1, porcentaje: "95%" }
];
