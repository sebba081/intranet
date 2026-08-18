# 📘 Documentación Técnica - Intranet Educativa

Este directorio concentra la documentación funcional y de diseño del sistema.

## 📂 Contenido

### 1) Requerimientos

- [`requerimientos.md`](requerimientos.md)
  - Objetivo del sistema.
  - Actores involucrados.
  - Requerimientos funcionales por módulo.
  - Requerimientos no funcionales.

### 2) Diagramas

- [`diagramas/README.md`](diagramas/README.md)
  - Casos de uso generales y por rol.
  - Modelo de datos y diagrama de base de datos.

### 3) Documento fuente

- `Requerimientos_Intranet_Educativa.docx`
  - Versión editable del documento de requerimientos.

## 🧭 Cómo leer esta documentación

1. Comienza por `requerimientos.md` para entender alcance y reglas funcionales.
2. Revisa los diagramas para validar actores, flujos y entidades.
3. Contrasta con implementación en `frontend/src/features`, `backend/src/routes` y `backend/src/models`.

## 🔄 Mantenimiento recomendado

Cuando cambie el sistema, actualiza en este orden:

1. Requerimientos (qué cambia y por qué).
2. Diagramas (cómo cambia el diseño).
3. README raíz (cómo ejecutar/probar lo nuevo).

## ✅ Criterio de calidad documental

Cada cambio funcional debería dejar trazabilidad mínima:

- Módulo afectado.
- Endpoints impactados (si aplica).
- Entidades/modelos impactados.
- Pruebas ejecutadas para validar el cambio.
