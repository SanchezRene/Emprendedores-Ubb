"use strict";

const ayudanteController = require("../controllers/ayudante.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para los ayudantes
router.get("/",authorizationMw.isAdmin, ayudanteController.getAyudantes);
router.get("/:id", ayudanteController.getAyudanteById);
router.post("/",authorizationMw.isAdmin, ayudanteController.createAyudante);
router.put("/:id",authorizationMw.isAdmin, ayudanteController.updateAyudante);
router.delete("/:id",authorizationMw.isAdmin, ayudanteController.deleteAyudante);

// Exporta el enrutador
module.exports = router;
