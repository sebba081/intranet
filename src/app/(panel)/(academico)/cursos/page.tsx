import Link from "next/link";
import { Card } from "@/shared/ui/card";
import { courses } from "@/modules/academico/cursos/model/courses";

export default function CursosPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Cursos</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="space-y-2">
            <p className="text-xs text-slate-500">{course.code}</p>
            <h2 className="text-lg font-semibold">{course.name}</h2>
            <p className="text-sm">Profesor/a: {course.teacher}</p>
            <p className="text-sm">Estudiantes: {course.students} · Avance: {course.progress}%</p>
            <Link className="text-sm font-medium text-primary hover:text-primary-hover" href={`/cursos/${course.id}`}>Ver detalle</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
