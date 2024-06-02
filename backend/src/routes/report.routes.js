const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

// Ruta para crear un reporte
router.post("/", reportController.createReport);

module.exports = router;
