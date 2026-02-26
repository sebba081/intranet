import { RoleGate } from "@/modules/auth";
import { DataTable } from "@/shared/ui/data-table";

const reports = [
  { reporte: "Rendimiento por cohorte", estado: "listo", actualizado: "Hoy" },
  { reporte: "Deserción temprana", estado: "pendiente", actualizado: "Ayer" }
];

export default function AdminReportesPage() {
  return <RoleGate allow={["director", "admin_sistema"]}><DataTable title="Administración · Reportes" rows={reports} /></RoleGate>;
}
