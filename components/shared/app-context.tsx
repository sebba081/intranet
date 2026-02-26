"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Role, User } from "@/lib/types";

type AppContextValue = {
  user: User;
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
};

const defaultUser: User = {
  name: "Sofía Martínez",
  email: "sofia.martinez@instituto.edu",
  roles: ["alumno", "profesor", "jefe_de_carrera"]
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role>(defaultUser.roles[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value = useMemo(
    () => ({ user: defaultUser, activeRole, setActiveRole, sidebarCollapsed, setSidebarCollapsed }),
    [activeRole, sidebarCollapsed]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext debe usarse dentro de AppProvider");
  return ctx;
}
