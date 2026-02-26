export const users = Array.from({ length: 22 }).map((_, idx) => ({
  name: `Usuario ${idx + 1}`,
  email: `usuario${idx + 1}@instituto.edu`,
  role: idx % 2 ? "alumno" : "profesor"
}));
