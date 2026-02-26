import { DataTable } from "@/components/shared/data-table";
import { announcements } from "@/data/mock-data";

export default function AnunciosPage() {
  return <DataTable title="Anuncios" rows={announcements} />;
}
