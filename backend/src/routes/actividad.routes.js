"use strict";

const actividadController = require("../controllers/actividad.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para las actividades
router.get("/", authorizationMw.isAdminOrManagementOrBusinessOwner, actividadController.getAllActividades);
router.get("/:id", authorizationMw.isAdminOrManagementOrBusinessOwner, actividadController.getActividadById);
router.post("/", authorizationMw.isAdminOrManagement, actividadController.createActividad);
router.put("/:id", authorizationMw.isAdminOrManagement, actividadController.updateActividad);
router.delete("/:id", authorizationMw.isAdminOrManagement, actividadController.deleteActividad);

// Exporta el enrutador
module.exports = router;
