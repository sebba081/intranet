// middleware/auth.js
const users = [
  { id: 1, username: 'admin@admin.com', password: 'admin' },
  { id: 2, username: 'user', password: 'pass123' }
];

const authMiddleware = (req, res, next) => {
  // Obtener credenciales del body (POST) o headers
  const { username, password } = req.body;
  
  // Verificar si se enviaron credenciales
  if (!username || !password) {
    return res.status(400).json({
      error: 'Credenciales requeridas',
      message: 'Debe proporcionar usuario y contraseña'
    });
  }

  // Buscar usuario en la "base de datos"
  const user = users.find(u => 
    u.username === username && u.password === password
  );

  // Validar existencia
  if (!user) {
    return res.status(401).json({
      error: 'Acceso denegado',
      message: 'Usuario o contraseña inválidos'
    });
  }

  // Adjuntar usuario autenticado al request
  req.user = user;
  
  // Continuar al siguiente middleware/ruta
  next();
};

module.exports = { authMiddleware };