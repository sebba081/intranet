# 🚪 Intranet

## 📖 Descripción

Esta es una aplicación web de intranet diseñada para gestionar información interna de una organización. Utiliza \*\*Node.js\*\* con \*\*Express\*\* para el backend y \*\*EJS\*\* para la generación de vistas en el servidor.

## ✨ Características

- 👥 Gestión de usuarios, cursos, materias y más.

- 🔐 Autenticación de usuarios segura.

- 🎨 Interfaz responsiva con Tailwind CSS.

## 🛠️ Requisitos

- Node.js (versión 14 o superior)

- npm (versión 6 o superior)

## ⚡ Instalación

```bash
git clone [https://github.com/sebba081/intranet.git](https://github.com/sebba081/intranet.git)
```
```bash
cd intranet
```
```bash
npm install
```

## ▶️ Uso

### 🧑‍💻 Desarrollo

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

Accede en tu navegador a: [http://localhost:3000](http://localhost:3000)

### 🚀 Producción

Para ejecutar en modo producción:

```
bash
npm start
```

## 📁 Estructura del Proyecto

```plaintext
src/ # Código fuente de la aplicación 
router/ # Definición de rutas 
views/ # Plantillas EJS para renderizado 
public/ # Archivos estáticos (CSS, JS, imágenes) 
package.json # Dependencias y scripts del proyecto
```

## 📚 Documentación

La documentación técnica está disponible en el directorio `/docs`:

* ⚙️ **setup.md** – Configuración del entorno y dependencias.
* 📖 **usage.md** – Guía de uso general.
* 🗂️ **migrations.md** – Migraciones de base de datos con Sequelize.
* 📡 **API** – Documentación de endpoints, autenticación y más (`/docs/api`).
* 🧪 **Testing y Deployment** – Pruebas y despliegue (`/docs/guides`).
* ❓ **FAQ** y **Contribución** – Preguntas frecuentes y guía para colaborar.

## 🤝 Contribución

¿Quieres contribuir? ¡Genial!
Por favor abre un **issue** o envía un **pull request** siguiendo las pautas en `docs/contributing.md`.
