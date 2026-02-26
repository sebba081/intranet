"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

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

        <form
          action="/api/usuarios/login"
          method="POST"
          className="space-y-3"
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            if (!formData.get("email") || !formData.get("password")) {
              e.preventDefault();
              setError("Debes ingresar correo y contraseña.");
            }
          }}
        >
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
            className="h-10 w-full rounded-md bg-primary font-medium text-white hover:opacity-90"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
