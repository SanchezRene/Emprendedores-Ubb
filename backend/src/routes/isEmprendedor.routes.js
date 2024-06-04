const express = require("express");
const router = express.Router();
const actividadController = require("../controllers/actividad.controller.js");
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Rutas para inscripción y confirmación de asistencia
router.post("/:id/inscribir", authorizationMw.isEmprendedor, actividadController.inscribirActividad);
router.post("/:id/confirmar-asistencia", authorizationMw.isEmprendedor, actividadController.confirmarAsistencia);

module.exports = router;
