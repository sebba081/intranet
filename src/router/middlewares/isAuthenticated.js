const { Usuario } = require('../../database/models');
const bcrypt = require('bcrypt');

async function authMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    req.authError = 'Todos los campos son obligatorios';
    return next();
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      req.authError = 'Correo no registrado';
      return next();
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      req.authError = 'Contraseña incorrecta';
      return next();
    }

    // Guardar usuario en la sesión
    if (req.session) {
      req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol
      };
    }

    next();

  } catch (error) {
    console.error(error);
    req.authError = 'Error interno del servidor';
    next();
  }
}

module.exports = { authMiddleware };
