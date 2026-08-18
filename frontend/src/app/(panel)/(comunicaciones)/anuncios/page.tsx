import { DataTable } from "@/components/ui/data-table";
import { announcements } from "@/features/comunicaciones";

export default function AnunciosPage() {
  return <DataTable title="Anuncios" rows={announcements} />;
}
