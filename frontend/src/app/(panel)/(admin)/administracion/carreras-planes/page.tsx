import { RoleGate } from "@/features/auth";
import { DataTable } from "@/components/ui/data-table";

const careers = [
  { carrera: "Ingeniería Informática", plan: "2025", estado: "vigente" },
  { carrera: "Administración", plan: "2024", estado: "actualización" }
];

export default function AdminCarrerasPage() {
  return <RoleGate allow={["jefe_de_carrera", "director", "admin_sistema"]}><DataTable title="Administración · Carreras y Planes" rows={careers} /></RoleGate>;
}
