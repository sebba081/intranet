import { redirect } from "next/navigation";

const sectionToRoute: Record<string, string> = {
  dashboard: "/dashboard",
  cursos: "/cursos",
  evaluaciones: "/evaluaciones",
  asistencia: "/asistencia",
  anuncios: "/anuncios",
  mensajes: "/mensajes",
  documentos: "/documentos",
  "admin-usuarios": "/administracion/usuarios-roles",
  "admin-carreras": "/administracion/carreras-planes",
  "admin-reportes": "/administracion/reportes"
};

export default async function HomeSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  redirect(sectionToRoute[section] ?? "/dashboard");
}
