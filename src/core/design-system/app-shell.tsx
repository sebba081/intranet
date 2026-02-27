"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/core/design-system/sidebar";
import { Topbar } from "@/core/design-system/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthLayout = pathname === "/login";

  if (isAuthLayout) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
