import "./globals.css";
import { AppProvider } from "@/modules/auth";
import { AppShell } from "@/core/design-system/app-shell";
import { Toaster } from "sonner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
