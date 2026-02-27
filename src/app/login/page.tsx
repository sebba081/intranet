"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/modules/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAppContext();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!email || !password) {
      setError("Debes ingresar correo y contraseña.");
      return;
    }

    setLoading(true);
    const isValid = login(email, password);

    if (!isValid) {
      setLoading(false);
      setError("Credenciales inválidas. Revisa el correo y contraseña.");
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Intranet Instituto</h1>
          <p className="text-sm text-slate-500">Ingresa tus credenciales para iniciar sesión</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-primary/30 focus:ring dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-primary/30 focus:ring dark:border-slate-700 dark:bg-slate-950"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-md bg-primary font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <p className="font-semibold">Usuarios demo:</p>
          <p>sofia.martinez@instituto.edu / intranet123</p>
          <p>carlos.herrera@instituto.edu / admin123</p>
        </div>
      </section>
    </main>
  );
}
