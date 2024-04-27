"use strict";

const inscripcionController = require("../controllers/inscripcion.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para las inscripciones
router.get("/", inscripcionController.getInscripciones);
router.get("/:id", inscripcionController.getInscripcionById);
router.post(
  "/",
  authorizationMw.isOwnerOrAdmin,
  inscripcionController.createInscripcion,
);
router.put(
  "/:id",
  authorizationMw.isOwnerOrAdmin,
  inscripcionController.updateInscripcion,
);
router.delete(
  "/:id",
  authorizationMw.isOwnerOrAdmin,
  inscripcionController.deleteInscripcion,
);

// Exporta el enrutador
module.exports = router;
