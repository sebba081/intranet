"use client";

import { Card } from "@/shared/ui/card";
import { useAppContext } from "@/modules/auth";

import { roleSummary } from "@/modules/dashboard/model/role-summary";


export default function DashboardPage() {
  const { activeRole } = useAppContext();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard · {activeRole.replaceAll("_", " ")}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {roleSummary[activeRole].map((item) => (
          <Card key={item}><p className="font-medium">{item}</p><p className="text-sm text-slate-500">Vista resumida con datos mock en tiempo real.</p></Card>
        ))}
      </div>
    </div>
  );
}
