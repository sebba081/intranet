import { LucideIcon } from "lucide-react";

export type Role = "alumno" | "profesor" | "jefe_de_carrera" | "director" | "admin_sistema";

export type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
};

export type User = {
  name: string;
  email: string;
  roles: Role[];
};
