import { RoleGate } from "@/features/auth";
import { DataTable } from "@/components/ui/data-table";

const reports = [
  { reporte: "Rendimiento por cohorte", estado: "listo", actualizado: "Hoy" },
  { reporte: "Deserción temprana", estado: "pendiente", actualizado: "Ayer" }
];

export default function AdminReportesPage() {
  return <RoleGate allow={["director", "admin_sistema"]}><DataTable title="Administración · Reportes" rows={reports} /></RoleGate>;
}
