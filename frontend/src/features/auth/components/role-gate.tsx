"use client";

import type { Role } from "@/types";
import { useAppContext } from "./app-context";
import { Card } from "@/components/ui/card";

export function RoleGate({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const { activeRole } = useAppContext();
  if (!allow.includes(activeRole)) {
    return <Card>No tienes permisos para acceder a esta sección con el rol activo.</Card>;
  }
  return <>{children}</>;
}
