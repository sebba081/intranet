import { DataTable } from "@/shared/ui/data-table";
import { documents } from "@/modules/documentos/model/documents";

export default function DocumentosPage() {
  return <DataTable title="Documentos" rows={documents} />;
}
