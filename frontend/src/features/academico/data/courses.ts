// Tipos y mock data alineados con v_curso (schema 6FN)

export interface Curso {
  id: string;
  materia_id: string;
  periodo_id: string;
  profesor_persona_id: string;
  cupo: number;
  // Campos enriquecidos via JOIN con vistas (usados en la UI)
  materia_nombre?: string;
  materia_codigo?: string;
  profesor_nombre?: string;
  profesor_apellido?: string;
  periodo_nombre?: string;
}

export const courses: Curso[] = [
  {
    id: "c-001",
    materia_id: "m-101",
    periodo_id: "p-2026-1",
    profesor_persona_id: "per-001",
    cupo: 38,
    materia_nombre: "Matemática I",
    materia_codigo: "MAT101",
    profesor_nombre: "Ana",
    profesor_apellido: "López",
    periodo_nombre: "2026-1"
  },
  {
    id: "c-002",
    materia_id: "m-220",
    periodo_id: "p-2026-1",
    profesor_persona_id: "per-002",
    cupo: 32,
    materia_nombre: "Programación Web",
    materia_codigo: "PRO220",
    profesor_nombre: "Luis",
    profesor_apellido: "Vega",
    periodo_nombre: "2026-1"
  },
  {
    id: "c-003",
    materia_id: "m-150",
    periodo_id: "p-2026-1",
    profesor_persona_id: "per-003",
    cupo: 26,
    materia_nombre: "Física Aplicada",
    materia_codigo: "FIS150",
    profesor_nombre: "Carla",
    profesor_apellido: "Rojas",
    periodo_nombre: "2026-1"
  }
];
