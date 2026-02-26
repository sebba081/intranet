"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { courses, evaluations, attendance } from "@/data/mock-data";

const tabs = ["Resumen", "Evaluaciones", "Asistencia", "Material"] as const;

export default function CursoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Resumen");
  const course = useMemo(() => courses.find((c) => c.id === id), [id]);
  if (!course) return <Card>Curso no encontrado.</Card>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{course.name}</h1>
      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-md px-3 py-1 text-sm ${tab === item ? "bg-accent text-primary" : "hover:bg-accent"}`}>{item}</button>
        ))}
      </div>
      <Card>
        {tab === "Resumen" && <p>Curso {course.code}. Profesor/a {course.teacher}. Progreso general: {course.progress}%.</p>}
        {tab === "Evaluaciones" && evaluations.map((e) => <p key={e.title}>{e.title} · {e.status} · Promedio {e.average}</p>)}
        {tab === "Asistencia" && attendance.map((a) => <p key={a.course}>{a.course}: {a.rate}</p>)}
        {tab === "Material" && <p>Documentos compartidos, guías y enlaces de apoyo.</p>}
      </Card>
    </div>
  );
}
