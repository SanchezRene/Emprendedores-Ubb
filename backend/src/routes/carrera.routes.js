"use strict";

const carreraController = require("../controllers/carrera.controller.js");

const express = require("express");
const router = express.Router();  

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para las carreras
/**
 * Sólo los administradores pueden crear, actualizar y eliminar carreras.
 */
router.get("/", carreraController.getCarreras);
router.get("/:id", carreraController.getCarreraById);
router.post("/",authorizationMw.isAdmin, carreraController.createCarrera);
router.put("/:id",authorizationMw.isAdmin, carreraController.updateCarrera);
router.delete("/:id",authorizationMw.isAdmin, carreraController.deleteCarrera);

// Exporta el enrutador
module.exports = router;





