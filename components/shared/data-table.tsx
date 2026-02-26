"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Row = Record<string, string | number>;

export function DataTable({ title, rows }: { title: string; rows: Row[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 6;

  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${title} actualizada`);
    }, 800);
  };

  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Input placeholder="Filtrar..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="w-52" />
          <Button variant="outline" onClick={refresh}>Recargar</Button>
        </div>
      </div>
      {loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
      ) : !current.length ? (
        <div className="rounded-md border border-dashed border-border py-10 text-center text-sm text-slate-500">No hay resultados para el filtro aplicado.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  {Object.keys(current[0]).map((key) => <th className="px-2 py-2 capitalize" key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {current.map((row, idx) => (
                  <tr className="border-b border-border" key={idx}>
                    {Object.values(row).map((value, cidx) => <td className="px-2 py-2" key={cidx}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Button>
            <span className="text-sm">{page}/{pages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))}>Siguiente</Button>
          </div>
        </>
      )}
    </Card>
  );
}
