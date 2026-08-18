import { DataTable } from "@/components/ui/data-table";
import { documents } from "@/features/documentos";

export default function DocumentosPage() {
  return <DataTable title="Documentos" rows={documents} />;
}
