export const courses = [
  { id: "mat101", code: "MAT101", name: "Matemática I", teacher: "Ana López", progress: 74, students: 38 },
  { id: "pro220", code: "PRO220", name: "Programación Web", teacher: "Luis Vega", progress: 52, students: 32 },
  { id: "fis150", code: "FIS150", name: "Física Aplicada", teacher: "Carla Rojas", progress: 88, students: 26 }
];

export const evaluations = [
  { course: "Matemática I", title: "Parcial 2", dueDate: "2026-03-10", average: 5.4, status: "publicado" },
  { course: "Programación Web", title: "Proyecto Sprint", dueDate: "2026-03-12", average: 6.1, status: "en revisión" }
];

export const attendance = [
  { course: "Matemática I", present: 18, absent: 2, rate: "90%" },
  { course: "Programación Web", present: 19, absent: 1, rate: "95%" }
];

export const announcements = [
  { title: "Inicio de período académico", area: "Dirección", date: "2026-03-02" },
  { title: "Actualización de reglamento de evaluación", area: "Académico", date: "2026-03-04" }
];

export const messages = [
  { from: "Coordinación", subject: "Reunión de carrera", time: "Hace 20 min" },
  { from: "Bienestar estudiantil", subject: "Becas disponibles", time: "Hace 3 h" }
];

export const documents = [
  { name: "Plan de estudios 2026", type: "PDF", owner: "Dirección", updated: "2026-02-28" },
  { name: "Calendario académico", type: "DOCX", owner: "Académico", updated: "2026-03-01" }
];

export const users = Array.from({ length: 22 }).map((_, idx) => ({
  name: `Usuario ${idx + 1}`,
  email: `usuario${idx + 1}@instituto.edu`,
  role: idx % 2 ? "alumno" : "profesor"
}));
