# Gestión de Migraciones con Sequelize

## Introducción

Esta guía describe cómo configurar y utilizar Sequelize para gestionar migraciones de base de datos en un proyecto Node.js.

## Instalación

1. Instala Sequelize CLI y el cliente de base de datos que estés utilizando (por ejemplo, `pg` para PostgreSQL, `mysql2` para MySQL, etc.).

   ```bash
   npm install --save sequelize
   npm install --save-dev sequelize-cli
   npm install pg pg-hstore # o mysql2, sqlite3, etc., dependiendo de tu base de datos
   ```

## Configuración

1. Inicializa Sequelize CLI en tu proyecto:

   ```bash
   npx sequelize-cli init
   ```

   Esto generará la siguiente estructura de carpetas:

   ```
   config/
   models/
   migrations/
   seeders/
   ```

2. Configura el archivo `config/config.json` (o `.js`) con los datos de tu base de datos:

   ```json
   {
     "development": {
       "username": "tu_usuario",
       "password": "tu_contraseña",
       "database": "tu_base_de_datos",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

## Creación de Migraciones

1. Usa el comando de Sequelize para crear una nueva migración:

   ```bash
   npx sequelize-cli migration:generate --name nombre-de-la-migracion --migrations-path src/database/migrations
   ```

2. Edita el archivo generado en el directorio `migrations` y define las operaciones `up` y `down`:

   ```js
   'use strict';

   module.exports = {
     async up(queryInterface, Sequelize) {
       await queryInterface.createTable('users', {
         id: {
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
         },
         name: {
           type: Sequelize.STRING
         },
         email: {
           type: Sequelize.STRING
         },
         createdAt: {
           allowNull: false,
           type: Sequelize.DATE
         },
         updatedAt: {
           allowNull: false,
           type: Sequelize.DATE
         }
       });
     },

     async down(queryInterface, Sequelize) {
       await queryInterface.dropTable('users');
     }
   };
   ```

## Ejecución de Migraciones

1. Para aplicar las migraciones, ejecuta:

   ```bash
   npx sequelize-cli db:migrate --config src/config/config.json --migrations-path src/database/migrations
   ```

2. Para revertir la última migración, usa:

   ```bash
   npx sequelize-cli db:migrate:undo --config src/config/config.json --migrations-path src/database/migrations
   ```

## Integración

Asegúrate de ejecutar las migraciones antes de iniciar tu aplicación en un entorno de desarrollo o producción para que la base de datos esté en el estado esperado.
