const connection = require('./database/config/conection');
const app = require('./app');

const port = process.env.PORT || 3000;

connection
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
