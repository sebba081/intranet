import "./globals.css";
import { AppProvider } from "@/components/shared/app-context";
import { AppShell } from "@/components/layout/app-shell";
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
