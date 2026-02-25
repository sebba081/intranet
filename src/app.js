const express = require('express');
const path = require('path');
const indexApi = require('./router/api/indexApi');
const indexController = require('./router/controllers/indexController');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use('/vistas', express.static(path.join(__dirname, 'public', 'css')));

// Rutas
app.use('/api', indexApi);
app.use('/', indexController);

module.exports = app; // 👈 importante para Supertest