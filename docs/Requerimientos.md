# 📄 Documento de Requerimientos - Intranet Educativa
Este documento resume los requerimientos funcionales y no funcionales del sistema de intranet educativa.
Está diseñado como referencia inicial para el desarrollo y documentación del proyecto.
Para una versión completa, consulta el [documento en Word](docs/Requerimientos_Intranet_Educativa.docx).
---
## ✅ Requerimientos Funcionales
| Código | Requerimiento Funcional |
|--------|--------------------------|
| RF1 | El sistema debe permitir el registro e inicio de sesión de usuarios. |
| RF2 | El sistema debe soportar los roles: alumno, profesor, administrativo. |
| RF3 | El sistema debe permitir crear y administrar materias. |
| RF4 | Los alumnos pueden inscribirse en materias disponibles por semestre. |
| RF5 | Los profesores pueden registrar y editar notas por estudiante y materia. |
| RF6 | Los profesores pueden registrar asistencia diaria por materia. |
| RF7 | Los alumnos pueden visualizar sus notas y asistencia, organizadas por semestre. |
| RF8 | El sistema debe permitir gestionar semestres académicos (ej: 2025-1, 2025-2). |
| RF9 | La institución y los profesores pueden enviar comunicados/avisos a alumnos. |
| RF10 | El sistema debe ofrecer estadísticas específicas según rol (notas, asistencia, etc). |
| RF11 | El sistema debe permitir la carga masiva de usuarios (ej. desde archivo CSV). |
| RF12 | El sistema debe presentar un panel personalizado por rol (dashboard). |
| RF13 | El sistema debe dejar la puerta abierta para agregar un rol 'director' en el futuro. |

---
## 🔒 Requerimientos No Funcionales
| Código | Requerimiento No Funcional |
|--------|-----------------------------|
| RNF1 | El sistema debe encriptar contraseñas y usar HTTPS para proteger los datos. |
| RNF2 | La interfaz debe ser responsiva (adaptada a móvil, tablet y escritorio). |
| RNF3 | La aplicación debe ser modular y escalable, considerando futuras sedes/instituciones. |
| RNF4 | El sistema debe permitir respaldo automático de la base de datos. |
| RNF5 | El sistema debe mantener registro de acciones importantes (logs mínimos). |
| RNF6 | El código debe seguir buenas prácticas y estar adecuadamente documentado. |
| RNF7 | El sistema no se conectará con sistemas externos (como Moodle o SIGE) en esta etapa. |
