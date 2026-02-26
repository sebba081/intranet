import { DataTable } from "@/components/shared/data-table";
import { documents } from "@/data/mock-data";

export default function DocumentosPage() {
  return <DataTable title="Documentos" rows={documents} />;
}
