import { DataTable } from "@/shared/ui/data-table";
import { announcements } from "@/modules/comunicaciones/anuncios/model/announcements";

export default function AnunciosPage() {
  return <DataTable title="Anuncios" rows={announcements} />;
}
