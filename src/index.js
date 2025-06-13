const express = require('express');
const path = require('path');
const indexApi = require('./router/api/indexApi');
const indexController = require('./router/controllers/indexController');
const { sequelize } = require('./database/models'); // Importar sequelize desde models

// Configurar la aplicación de Express
const app = express();

// Configurar el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Configurar la carpeta de archivos estáticos
app.use('/vistas', express.static(path.join(__dirname, 'public', 'css')));

// Rutas
app.use('/api', indexApi);
app.use('/', indexController);

// Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Servicio levantado: http://localhost:${app.get('port')}`);
});

// Conexión a la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos conectada y sincronizada');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
});