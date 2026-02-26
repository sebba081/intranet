"use client";

import { Card } from "@/components/ui/card";
import { useAppContext } from "@/components/shared/app-context";

const roleSummary = {
  alumno: ["Próximas evaluaciones", "Asistencia general", "Mensajes pendientes"],
  profesor: ["Cursos asignados", "Evaluaciones por corregir", "Asistencia del día"],
  jefe_de_carrera: ["Indicadores por cohorte", "Carga docente", "Solicitudes académicas"],
  director: ["Matrícula total", "KPIs institucionales", "Reportes ejecutivos"],
  admin_sistema: ["Usuarios activos", "Permisos y auditoría", "Integraciones"]
};

export default function DashboardPage() {
  const { activeRole } = useAppContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard · {activeRole.replaceAll("_", " ")}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {roleSummary[activeRole].map((item) => (
          <Card key={item}><p className="font-medium">{item}</p><p className="text-sm text-slate-500">Vista resumida con datos mock en tiempo real.</p></Card>
        ))}
      </div>
    </div>
  );
}
