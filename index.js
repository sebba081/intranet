const express = require('express');
const path = require('path');
const indexRouter = require('./src/router/index.js');
const app = express();

// Configurar el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,"src", 'vistas'));

// Configurar la carpeta de archivos estáticos
app.use('/vistas', express.static(path.join(__dirname, 'public', 'css')));

// Usar el enrutador de home
app.use('/', indexRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Servicio levantado: http://localhost:${app.get('port')}`);
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
});