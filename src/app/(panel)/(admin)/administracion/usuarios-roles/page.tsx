import { RoleGate } from "@/modules/auth";
import { DataTable } from "@/shared/ui/data-table";
import { users } from "@/modules/admin/usuarios-roles/model/users";

export default function AdminUsuariosPage() {
  return <RoleGate allow={["jefe_de_carrera", "director", "admin_sistema"]}><DataTable title="Administración · Usuarios y Roles" rows={users} /></RoleGate>;
}
