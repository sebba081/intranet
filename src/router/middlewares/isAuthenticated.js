// middleware/auth.js
const users = [
  { id: 1, email: 'admin@admin.com', password: 'admin' },
  { id: 2, email: 'user', password: 'pass123' }
];

const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    req.authError = 'Debe proporcionar usuario y contraseña';
    return next();
  }

  const user = users.find(u => 
    u.email === email && u.password === password
  );

  if (!user) {
    req.authError = 'Usuario o contraseña inválidos';
    return next();
  }

  req.user = user;
  next();
};

module.exports = { authMiddleware }