const connection = require('./database/config/conection');
const express = require('express');
const path = require('path');
const indexApi = require('./router/api/indexApi');
const indexController = require('./router/controllers/indexController');

// Configurar el motor de plantillas
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json()); // Agregar este middleware para solicitudes JSON
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar la carpeta de archivos estáticos
app.use('/vistas', express.static(path.join(__dirname, 'public', 'css')));

// Usar el enrutador de home
app.use('/api', indexApi);
app.use('/', indexController);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
// No necesitas llamar a connection.connect aquí, ya que se hace en conection.js