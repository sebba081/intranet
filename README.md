# Intranet

## Descripción

Este proyecto es una aplicación web de intranet diseñada para gestionar información interna de una organización. Utiliza **Node.js** con **Express** para el backend y **EJS** para la generación de vistas en el servidor.

## Características

* Gestión de usuarios, cursos, materias, y más.
* Autenticación de usuarios.
* Interfaz de usuario responsiva con Tailwind CSS.

## Requisitos

* Node.js (versión 14 o superior)
* npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/sebba081/intranet.git
   ```
2. Navega al directorio del proyecto:

   ```bash
   cd intranet
   ```
3. Instala las dependencias:

   ```bash
   npm install
   ```

## Uso

### Desarrollo

Para iniciar el servidor en modo de desarrollo, ejecuta:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

### Producción

Para iniciar el servidor en modo de producción, ejecuta:

```bash
npm start
```

## Estructura del Proyecto

* `src/`: Código fuente de la aplicación.
* `router/`: Rutas de la aplicación.
* `views/`: Plantillas EJS.
* `public/`: Archivos estáticos como CSS.
* `package.json`: Configuración y dependencias del proyecto.

## Documentación

La documentación técnica se encuentra en el directorio [`/docs`](./docs), donde encontrarás:

* Configuración y uso
* Migraciones con Sequelize
* Referencia de la API
* Pruebas y despliegue
* Contribución y preguntas frecuentes

## Contribución

Si deseas contribuir, por favor abre un issue o envía un pull request siguiendo las pautas definidas en [`docs/contributing.md`](./docs/contributing.md).

---
