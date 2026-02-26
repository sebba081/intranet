import { DataTable } from "@/shared/ui/data-table";
import { evaluations } from "@/modules/academico/evaluaciones/model/evaluations";

export default function EvaluacionesPage() {
  return <DataTable title="Evaluaciones y Notas" rows={evaluations} />;
}
