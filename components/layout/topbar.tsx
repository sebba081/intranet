"use client";

import { Bell, Search } from "lucide-react";
import { useAppContext } from "@/components/shared/app-context";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const { user, activeRole, setActiveRole } = useAppContext();

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-white px-4 py-3 dark:bg-slate-950">
      <div className="relative min-w-60 flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <Input placeholder="Buscar cursos, personas, documentos..." className="pl-9" />
      </div>
      <select
        value={activeRole}
        onChange={(e) => setActiveRole(e.target.value as typeof activeRole)}
        className="h-9 rounded-md border border-border bg-white px-2 text-sm dark:bg-slate-900"
      >
        {user.roles.map((role) => (
          <option key={role} value={role}>{role.replaceAll("_", " ")}</option>
        ))}
      </select>
      <ThemeToggle />
      <Button variant="outline" size="icon"><Bell size={16} /></Button>
      <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
        <span className="h-7 w-7 rounded-full bg-primary text-center leading-7 text-white">SM</span>
        <span className="hidden sm:block">{user.name}</span>
      </div>
    </header>
  );
}
