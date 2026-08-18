import { DataTable } from "@/components/ui/data-table";
import { messages } from "@/features/comunicaciones";

export default function MensajesPage() {
  return <DataTable title="Mensajes" rows={messages} />;
}
