import { DataTable } from "@/components/ui/data-table";
import { evaluations } from "@/features/academico";

export default function EvaluacionesPage() {
  return <DataTable title="Evaluaciones y Notas" rows={evaluations} />;
}
