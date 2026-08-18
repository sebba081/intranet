import "@/styles/globals.css";
import { AppProvider, RouteGuard } from "@/features/auth";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "sonner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AppProvider>
          <RouteGuard>
            <AppShell>{children}</AppShell>
            <Toaster richColors position="top-right" />
          </RouteGuard>
        </AppProvider>
      </body>
    </html>
  );
}
