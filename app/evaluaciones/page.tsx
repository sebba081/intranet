import { DataTable } from "@/components/shared/data-table";
import { evaluations } from "@/data/mock-data";

export default function EvaluacionesPage() {
  return <DataTable title="Evaluaciones y Notas" rows={evaluations} />;
}
