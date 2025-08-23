const express = require('express');
const router = express.Router();

// Ruta para la vista principal
router.get("/", (req, res) => {
    res.render("estudiantes/homeEstudiantes", { titulo: "Home" });
});

module.exports = router;