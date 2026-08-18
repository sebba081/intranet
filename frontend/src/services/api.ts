// Cliente HTTP de la API del backend (backend/src/routes).
// La URL base se configura con NEXT_PUBLIC_API_URL (ver .env.local.example).

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(public status: number, message: string, public detalle?: string) {
    super(message);
    this.name = "ApiError";
  }
}

type Params = Record<string, string | number | boolean | undefined>;

function construirUrl(path: string, params?: Params) {
  const url = new URL(`${API_URL}${path}`);
  for (const [clave, valor] of Object.entries(params ?? {})) {
    if (valor !== undefined) url.searchParams.set(clave, String(valor));
  }
  return url.toString();
}

/** Ejecuta una petición contra la API y devuelve el JSON tipado. */
export async function apiFetch<T>(path: string, init?: RequestInit & { params?: Params }): Promise<T> {
  const { params, ...rest } = init ?? {};

  const res = await fetch(construirUrl(path, params), {
    ...rest,
    headers: { "Content-Type": "application/json", ...rest.headers },
    credentials: "include"
  });

  if (res.status === 204) return undefined as T;

  const cuerpo = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, cuerpo.error ?? "Error de red", cuerpo.detalle);
  }
  return cuerpo as T;
}

export const api = {
  get: <T>(path: string, params?: Params) => apiFetch<T>(path, { method: "GET", params }),
  post: <T>(path: string, body: unknown) => apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" })
};
