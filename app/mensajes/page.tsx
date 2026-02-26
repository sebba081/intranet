import { DataTable } from "@/components/shared/data-table";
import { messages } from "@/data/mock-data";

export default function MensajesPage() {
  return <DataTable title="Mensajes" rows={messages} />;
}
