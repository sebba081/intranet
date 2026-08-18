import { RoleGate } from "@/features/auth";
import { DataTable } from "@/components/ui/data-table";
import { users } from "@/features/admin";

export default function AdminUsuariosPage() {
  return <RoleGate allow={["jefe_de_carrera", "director", "admin_sistema"]}><DataTable title="Administración · Usuarios y Roles" rows={users} /></RoleGate>;
}
