import { DataTable } from "@/components/ui/data-table";
import { attendance } from "@/features/academico";

export default function AsistenciaPage() {
  return <DataTable title="Asistencia" rows={attendance} />;
}
