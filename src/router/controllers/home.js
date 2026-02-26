const express = require('express');
const router = express.Router();

const roleNames = {
  alumno: 'Alumno',
  profesor: 'Profesor',
  jefe_de_carrera: 'Jefe de carrera',
  director: 'Director',
  admin_sistema: 'Admin sistema'
};

const userRolesByDbRole = {
  alumno: ['alumno'],
  profesor: ['profesor', 'alumno'],
  jefe_de_carrera: ['jefe_de_carrera', 'profesor'],
  director: ['director', 'jefe_de_carrera'],
  admin_sistema: ['admin_sistema', 'director']
};

const menu = [
  { section: 'dashboard', label: 'Inicio', icon: 'fa-house', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'cursos', label: 'Cursos', icon: 'fa-book-open', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director'] },
  { section: 'evaluaciones', label: 'Evaluaciones/Notas', icon: 'fa-clipboard-check', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director'] },
  { section: 'asistencia', label: 'Asistencia', icon: 'fa-user-check', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director'] },
  { section: 'anuncios', label: 'Anuncios', icon: 'fa-bullhorn', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'mensajes', label: 'Mensajes', icon: 'fa-comments', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'documentos', label: 'Documentos', icon: 'fa-folder-open', roles: ['alumno', 'profesor', 'jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'admin-usuarios', label: 'Admin · Usuarios y Roles', icon: 'fa-users-gear', roles: ['jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'admin-carreras', label: 'Admin · Carreras y Planes', icon: 'fa-diagram-project', roles: ['jefe_de_carrera', 'director', 'admin_sistema'] },
  { section: 'admin-reportes', label: 'Admin · Reportes', icon: 'fa-chart-line', roles: ['director', 'admin_sistema'] }
];

const data = {
  cursos: [
    { id: 'MAT101', nombre: 'Matemática I', docente: 'Ana López', aula: 'A-12', avance: '74%' },
    { id: 'PRO220', nombre: 'Programación Web', docente: 'Luis Vega', aula: 'Lab-2', avance: '52%' },
    { id: 'FIS150', nombre: 'Física Aplicada', docente: 'Carla Rojas', aula: 'B-03', avance: '88%' }
  ],
  evaluaciones: [
    { curso: 'Matemática I', evaluacion: 'Parcial 2', fecha: '2026-03-10', estado: 'Publicado', nota: '5.4' },
    { curso: 'Programación Web', evaluacion: 'Sprint 3', fecha: '2026-03-12', estado: 'En revisión', nota: '-' }
  ],
  asistencia: [
    { curso: 'Matemática I', asistencias: 18, inasistencias: 2, porcentaje: '90%' },
    { curso: 'Programación Web', asistencias: 19, inasistencias: 1, porcentaje: '95%' }
  ],
  anuncios: [
    { titulo: 'Inicio del período académico', area: 'Dirección', fecha: '2026-03-02' },
    { titulo: 'Actualización reglamento de evaluación', area: 'Académico', fecha: '2026-03-04' }
  ],
  mensajes: [
    { remitente: 'Coordinación', asunto: 'Reunión de carrera', fecha: 'Hoy 10:20' },
    { remitente: 'Bienestar estudiantil', asunto: 'Becas disponibles', fecha: 'Ayer 16:45' }
  ],
  documentos: [
    { nombre: 'Plan de estudios 2026', tipo: 'PDF', responsable: 'Dirección', actualizado: '2026-02-28' },
    { nombre: 'Calendario académico', tipo: 'DOCX', responsable: 'Académico', actualizado: '2026-03-01' }
  ],
  adminUsuarios: Array.from({ length: 18 }, (_, i) => ({ nombre: `Usuario ${i + 1}`, correo: `usuario${i + 1}@instituto.edu`, rol: i % 2 ? 'alumno' : 'profesor' })),
  adminCarreras: [
    { carrera: 'Ingeniería Informática', plan: '2025', estado: 'Vigente' },
    { carrera: 'Administración', plan: '2024', estado: 'En actualización' }
  ],
  adminReportes: [
    { reporte: 'Rendimiento por cohorte', estado: 'Listo', actualizado: 'Hoy' },
    { reporte: 'Deserción temprana', estado: 'Pendiente', actualizado: 'Ayer' }
  ]
};

const sectionConfig = {
  dashboard: { title: 'Dashboard', cards: ['Próximas evaluaciones', 'Asistencia general', 'Mensajes pendientes'], rows: [] },
  cursos: { title: 'Cursos', rows: data.cursos },
  evaluaciones: { title: 'Evaluaciones y Notas', rows: data.evaluaciones },
  asistencia: { title: 'Asistencia', rows: data.asistencia },
  anuncios: { title: 'Anuncios', rows: data.anuncios },
  mensajes: { title: 'Mensajes', rows: data.mensajes },
  documentos: { title: 'Documentos', rows: data.documentos },
  'admin-usuarios': { title: 'Administración · Usuarios y Roles', rows: data.adminUsuarios },
  'admin-carreras': { title: 'Administración · Carreras y Planes', rows: data.adminCarreras },
  'admin-reportes': { title: 'Administración · Reportes', rows: data.adminReportes }
};

const renderHome = (req, res) => {
  if (!req.session?.usuario) {
    if (req.query.demo === '1' && req.session) {
      req.session.usuario = { id: 0, nombre: 'Sofía Martínez', rol: 'jefe_de_carrera' };
    } else {
      return res.redirect('/login');
    }
  }

  const dbRole = req.session.usuario.rol || 'alumno';
  const availableRoles = userRolesByDbRole[dbRole] || [dbRole];
  const requestedRole = req.query.role;
  const activeRole = availableRoles.includes(requestedRole) ? requestedRole : req.session.activeRole;
  const safeActiveRole = availableRoles.includes(activeRole) ? activeRole : availableRoles[0];
  req.session.activeRole = safeActiveRole;

  const allowedMenu = menu.filter((item) => item.roles.includes(safeActiveRole));
  const section = req.params.section || 'dashboard';
  const isAllowedSection = allowedMenu.some((item) => item.section === section);

  if (!isAllowedSection) return res.redirect('/home/dashboard');

  const selected = sectionConfig[section] || sectionConfig.dashboard;

  res.render('intranet/index', {
    titulo: `Intranet · ${selected.title}`,
    usuario: req.session.usuario,
    roleNames,
    availableRoles,
    activeRole: safeActiveRole,
    menu: allowedMenu,
    activeSection: section,
    selected,
    cursoDetalle: data.cursos[0]
  });
};

router.get('/', renderHome);
router.get('/:section', renderHome);

module.exports = router;
