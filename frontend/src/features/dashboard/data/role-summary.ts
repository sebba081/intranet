// Resumen de widgets por rol.
//
// Conviven dos vocabularios de rol:
//   - `RolCodigo`: los roles del schema 6FN (backend / tabla rol_codigo).
//   - `Role`: los roles de la interfaz (sesión, navegación, RoleGate).
// El mapa `ROL_UI_A_CODIGO` traduce del segundo al primero para no duplicar
// los textos del resumen.

import type { Role } from "@/types";
import type { RolCodigo } from "@/features/admin";

export const roleSummary: Record<RolCodigo, string[]> = {
  alumno: [
    "Próximas evaluaciones",
    "Asistencia general",
    "Mensajes pendientes"
  ],
  profesor: [
    "Cursos asignados",
    "Evaluaciones por corregir",
    "Asistencia del día"
  ],
  administrativo: [
    "Usuarios activos",
    "Inscripciones pendientes",
    "Solicitudes académicas"
  ],
  director: [
    "Matrícula total",
    "KPIs institucionales",
    "Reportes ejecutivos"
  ],
  apoderado: [
    "Notas del alumno",
    "Asistencia mensual",
    "Comunicaciones del establecimiento"
  ]
};

const ROL_UI_A_CODIGO: Record<Role, RolCodigo> = {
  alumno: "alumno",
  profesor: "profesor",
  jefe_de_carrera: "administrativo",
  director: "director",
  admin_sistema: "administrativo"
};

/** Widgets a mostrar en el dashboard para el rol activo de la interfaz. */
export function resumenParaRol(role: Role): string[] {
  return roleSummary[ROL_UI_A_CODIGO[role]];
}
