const express = require('express');
const path = require('path');
const indexApi = require('./router/api/indexApi');
const indexController = require('./router/controllers/indexController');

// Configurar el motor de plantillas
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar la carpeta de archivos estáticos
app.use('/vistas', express.static(path.join(__dirname, 'public', 'css')));

// Middleware para analizar el cuerpo de las solicitudes

// Usar el enrutador de home
app.use('/api', indexApi);
app.use('/', indexController);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Servicio levantado: http://localhost:${app.get('port')}`);
})
// .on('error', (err) => {
//     console.error('Error al iniciar el servidor:', err);
// });