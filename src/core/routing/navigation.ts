import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Users
} from "lucide-react";
import type { MenuItem } from "@/shared/types";

export const navigationItems: MenuItem[] = [
  { label: "Inicio", href: "/dashboard", icon: Home, roles: ["alumno", "profesor", "jefe_de_carrera", "director", "admin_sistema"] },
  { label: "Cursos", href: "/cursos", icon: BookOpen, roles: ["alumno", "profesor", "jefe_de_carrera", "director"] },
  { label: "Horario", href: "/cursos", icon: Calendar, roles: ["alumno", "profesor", "jefe_de_carrera"] },
  { label: "Evaluaciones", href: "/evaluaciones", icon: ClipboardCheck, roles: ["alumno", "profesor", "jefe_de_carrera", "director"] },
  { label: "Asistencia", href: "/asistencia", icon: GraduationCap, roles: ["alumno", "profesor", "jefe_de_carrera", "director"] },
  { label: "Anuncios", href: "/anuncios", icon: Bell, roles: ["alumno", "profesor", "jefe_de_carrera", "director", "admin_sistema"] },
  { label: "Mensajes", href: "/mensajes", icon: MessageSquare, roles: ["alumno", "profesor", "jefe_de_carrera", "director", "admin_sistema"] },
  { label: "Documentos", href: "/documentos", icon: FileText, roles: ["alumno", "profesor", "jefe_de_carrera", "director", "admin_sistema"] },
  { label: "Administración", href: "/administracion/usuarios-roles", icon: Settings, roles: ["jefe_de_carrera", "director", "admin_sistema"] },
  { label: "Reportes", href: "/administracion/reportes", icon: Users, roles: ["director", "admin_sistema"] }
];
