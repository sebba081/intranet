"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/core/routing/navigation";
import { cn } from "@/shared/lib/utils";
import { useAppContext } from "@/modules/auth";
import { Button } from "@/shared/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { activeRole, sidebarCollapsed, setSidebarCollapsed } = useAppContext();
  const allowedItems = navigationItems.filter((item) => item.roles.includes(activeRole));

  return (
    <aside className={cn("border-r border-border bg-white p-3 transition-all dark:bg-slate-950", sidebarCollapsed ? "w-20" : "w-64")}>
      <div className="mb-4 flex items-center justify-between">
        {!sidebarCollapsed && <p className="text-sm font-semibold">Intranet Instituto</p>}
        <Button size="icon" variant="ghost" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </Button>
      </div>
      <nav className="space-y-1">
        {allowedItems.map((item) => (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent dark:hover:bg-slate-800",
              pathname === item.href && "bg-accent text-primary dark:bg-slate-800"
            )}
          >
            <item.icon size={16} />
            {!sidebarCollapsed && item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
