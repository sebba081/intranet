# 📂 Diagramas de la Intranet Educativa

Esta carpeta agrupa los diagramas de análisis funcional y de diseño de datos del proyecto.

## 🗺️ Casos de uso

### 1. General del sistema

- **Archivo:** [`casos_uso_general.svg`](casos_uso_general.svg)
- **Descripción:** visión global de los módulos y las principales interacciones.

![Diagrama general de casos de uso](casos_uso_general.svg)

### 2. Rol Alumno

- **Archivo:** [`casos_uso_alumno.svg`](casos_uso_alumno.svg)
- **Descripción:** funcionalidades disponibles para el perfil de alumno.

![Caso de uso alumnos](casos_uso_alumno.svg)

### 3. Rol Profesor

- **Archivo:** [`casos_uso_profesor.svg`](casos_uso_profesor.svg)
- **Descripción:** actividades académicas y de seguimiento por docente.

![Caso de uso profesor](casos_uso_profesor.svg)

### 4. Rol Administrativo

- **Archivo:** [`casos_uso_administrativo.svg`](casos_uso_administrativo.svg)
- **Descripción:** gestión operativa y administrativa del sistema.

![Caso de uso administrativo](casos_uso_administrativo.svg)

## 🗃️ Modelo y estructura de datos

### 5. Modelo de datos (ER)

- **Archivo:** [`modelo_datos.svg`](modelo_datos.svg)
- **Descripción:** entidades, relaciones y restricciones principales.

![Modelo de datos](modelo_datos.svg)

### 6. Diagrama base de datos

- **Archivo:** [`diagrama base de datos.svg`](diagrama%20base%20de%20datos.svg)
- **Descripción:** estructura relacional de tablas y vínculos.

![Diagrama base de datos](diagrama%20base%20de%20datos.svg)

## 🧪 Uso recomendado durante desarrollo

- Antes de modificar modelos Sequelize (`src/database/models`), revisa los diagramas de datos.
- Antes de agregar flujos de negocio o pantallas, revisa casos de uso por rol.
- Si cambian reglas de negocio, actualiza primero requerimientos y luego el diagrama relacionado.
