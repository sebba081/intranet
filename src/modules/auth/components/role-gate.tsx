"use client";

import type { Role } from "@/shared/types";
import { useAppContext } from "@/modules/auth";
import { Card } from "@/shared/ui/card";

export function RoleGate({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const { activeRole } = useAppContext();
  if (!allow.includes(activeRole)) {
    return <Card>No tienes permisos para acceder a esta sección con el rol activo.</Card>;
  }
  return <>{children}</>;
}
