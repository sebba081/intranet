# Gestión de Migraciones con Knex.js

## Introducción

Esta guía describe cómo configurar y utilizar Knex.js para gestionar migraciones de base de datos en un proyecto Node.js.

## Instalación

1. Instala Knex.js y el cliente de base de datos que estés utilizando (por ejemplo, `pg` para PostgreSQL, `mysql` para MySQL, etc.).

   ```bash
   npm install knex
   npm install pg # o mysql, sqlite3, etc., dependiendo de tu base de datos
   ```

## Configuración

1. Crea un archivo de configuración para Knex llamado `knexfile.js` en la raíz del proyecto.

   ```js
   // knexfile.js
   module.exports = {
     development: {
       client: 'pg', // o 'mysql', 'sqlite3', etc.
       connection: {
         host: '127.0.0.1',
         user: 'tu_usuario',
         password: 'tu_contraseña',
         database: 'tu_base_de_datos'
       },
       migrations: {
         directory: './migrations'
       }
     },
     // Puedes agregar configuraciones para producción, pruebas, etc.
   };
   ```

## Creación de Migraciones

1. Usa el comando de Knex para crear una nueva migración.

   ```bash
   npx knex migrate:make nombre_de_la_migracion
   ```

2. Edita el archivo de migración generado en el directorio `migrations` y define las operaciones `up` y `down`.

   ```js
   // 20231010123456_nombre_de_la_migracion.js
   exports.up = function(knex) {
     return knex.schema.createTable('users', function(table) {
       table.increments('id').primary();
       table.string('name');
       table.string('email');
       table.timestamps();
     });
   };

   exports.down = function(knex) {
     return knex.schema.dropTable('users');
   };
   ```

## Ejecución de Migraciones

1. Para aplicar las migraciones, ejecuta:

   ```bash
   npx knex migrate:latest
   ```

2. Para revertir la última migración, usa:

   ```bash
   npx knex migrate:rollback
   ```

## Integración

Asegúrate de ejecutar las migraciones antes de iniciar tu aplicación en un entorno de desarrollo o producción para que la base de datos esté en el estado esperado.

Guarda este contenido en un archivo llamado `migrations.md` dentro de un directorio `docs` en tu proyecto. Esto proporcionará una referencia clara y accesible para gestionar migraciones en tu aplicación.
