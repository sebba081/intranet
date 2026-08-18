// Tipos y mock data alineados con v_evaluacion + v_calificacion (schema 6FN)

export interface Evaluacion {
  id: string;
  curso_id: string;
  tipo: "parcial" | "examen" | "trabajo" | "promedio" | "control" | "tarea" | "otro";
  descripcion: string;
  ponderacion: number;   // 0.0 – 1.0
  fecha: string;         // YYYY-MM-DD
}

export interface Calificacion {
  inscripcion_id: string;
  evaluacion_id: string;
  nota: number;
}

// Mock para UI
export const evaluations: (Evaluacion & { curso_nombre?: string; promedio?: number; estado?: string })[] = [
  {
    id: "ev-001",
    curso_id: "c-001",
    tipo: "parcial",
    descripcion: "Parcial 2",
    ponderacion: 0.3,
    fecha: "2026-03-10",
    curso_nombre: "Matemática I",
    promedio: 5.4,
    estado: "publicado"
  },
  {
    id: "ev-002",
    curso_id: "c-002",
    tipo: "trabajo",
    descripcion: "Proyecto Sprint",
    ponderacion: 0.4,
    fecha: "2026-03-12",
    curso_nombre: "Programación Web",
    promedio: 6.1,
    estado: "en revisión"
  }
];
