import Link from "next/link";
import { Card } from "@/components/ui/card";
import { courses } from "@/features/academico";

export default function CursosPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Cursos</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="space-y-2">
            <p className="text-xs text-slate-500">{course.materia_codigo}</p>
            <h2 className="text-lg font-semibold">{course.materia_nombre}</h2>
            <p className="text-sm">Profesor/a: {course.profesor_nombre} {course.profesor_apellido}</p>
            <p className="text-sm">Cupo: {course.cupo} · Período: {course.periodo_nombre}</p>
            <Link className="text-sm font-medium text-primary hover:text-primary-hover" href={`/cursos/${course.id}`}>Ver detalle</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
