"use strict";

const actividadController = require("../controllers/actividad.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para las actividades
router.get("/", authorizationMw.isAdmin, actividadController.getAllActividades);
router.get("/:id", actividadController.getActividadById);
router.post("/", actividadController.createActividad);
router.put("/:id", actividadController.updateActividad);
router.delete("/:id", actividadController.deleteActividad);

// Exporta el enrutador
module.exports = router;

