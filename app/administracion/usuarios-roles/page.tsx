import { RoleGate } from "@/components/shared/role-gate";
import { DataTable } from "@/components/shared/data-table";
import { users } from "@/data/mock-data";

export default function AdminUsuariosPage() {
  return <RoleGate allow={["jefe_de_carrera", "director", "admin_sistema"]}><DataTable title="Administración · Usuarios y Roles" rows={users} /></RoleGate>;
}
