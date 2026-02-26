import { DataTable } from "@/shared/ui/data-table";
import { messages } from "@/modules/comunicaciones/mensajes/model/messages";

export default function MensajesPage() {
  return <DataTable title="Mensajes" rows={messages} />;
}
