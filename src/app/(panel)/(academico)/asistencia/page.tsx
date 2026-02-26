import { DataTable } from "@/shared/ui/data-table";
import { attendance } from "@/modules/academico/asistencia/model/attendance";

export default function AsistenciaPage() {
  return <DataTable title="Asistencia" rows={attendance} />;
}
