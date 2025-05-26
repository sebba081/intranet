const express = require('express');
const router = express.Router();

// Ruta para la vista principal
router.get("/", (req, res) => {
    res.render("home", { titulo: "Home" });
});

module.exports = router;