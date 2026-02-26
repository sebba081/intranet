import { DataTable } from "@/components/shared/data-table";
import { attendance } from "@/data/mock-data";

export default function AsistenciaPage() {
  return <DataTable title="Asistencia" rows={attendance} />;
}
