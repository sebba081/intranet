// Tipos y mock data alineados con v_usuario + v_persona + v_usuario_roles_vigentes (schema 6FN)

export type RolCodigo = "alumno" | "profesor" | "administrativo" | "director" | "apoderado";

export interface UsuarioCompleto {
  usuario_id: string;
  persona_id: string;
  nombre: string;
  apellido: string;
  dni?: string;
  email: string;
  rol: RolCodigo;
  establecimiento_id: string;
  titulo?: string;
  especialidad?: string;
}

export const users: UsuarioCompleto[] = Array.from({ length: 22 }).map((_, idx) => ({
  usuario_id:        `u-${idx + 1}`,
  persona_id:        `p-${idx + 1}`,
  nombre:            `Usuario ${idx + 1}`,
  apellido:          `Apellido ${idx + 1}`,
  email:             `usuario${idx + 1}@instituto.edu`,
  rol:               (idx % 2 ? "alumno" : "profesor") as RolCodigo,
  establecimiento_id: "estab-001"
}));
