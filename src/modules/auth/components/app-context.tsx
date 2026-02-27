"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role, User } from "@/shared/types";

type AppContextValue = {
  user: User | null;
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const availableUsers: Array<User & { password: string }> = [
  {
    name: "Sofía Martínez",
    email: "sofia.martinez@instituto.edu",
    roles: ["alumno", "profesor"],
    password: "intranet123"
  },
  {
    name: "Carlos Herrera",
    email: "carlos.herrera@instituto.edu",
    roles: ["admin_sistema"],
    password: "admin123"
  }
];

const defaultUser: User = {
  name: "Invitado",
  email: "",
  roles: ["alumno"]
};

const STORAGE_KEY = "intranet-auth-user";

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<Role>(defaultUser.roles[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
      setActiveRole(parsedUser.roles[0]);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = availableUsers.find((item) => item.email === email && item.password === password);
    if (!foundUser) {
      return false;
    }

    const safeUser: User = {
      name: foundUser.name,
      email: foundUser.email,
      roles: foundUser.roles
    };

    setUser(safeUser);
    setActiveRole(safeUser.roles[0]);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveRole(defaultUser.roles[0]);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      activeRole,
      setActiveRole,
      sidebarCollapsed,
      setSidebarCollapsed,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout
    }),
    [activeRole, isLoading, sidebarCollapsed, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext debe usarse dentro de AppProvider");
  return ctx;
}
