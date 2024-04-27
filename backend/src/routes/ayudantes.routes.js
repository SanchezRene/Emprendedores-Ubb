"use strict";

const ayudantesController = require("../controllers/ayudantes.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para los ayudantes
router.get("/", ayudantesController.getAyudantes);
router.get("/:id", ayudantesController.getAyudanteById);
router.post(
  "/",
  authorizationMw.isBusinessOwnerOrAdmin,
  ayudantesController.createAyudante,
);
router.put(
  "/:id",
  authorizationMw.isOwnerOrAdmin,
  ayudantesController.updateAyudante,
);
router.delete(
  "/:id",
  authorizationMw.isAdmin,
  ayudantesController.deleteAyudante,
);

// Exporta el enrutador
module.exports = router;
