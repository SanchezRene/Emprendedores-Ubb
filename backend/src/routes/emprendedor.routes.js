"use strict";

const emprendedorController = require("../controllers/emprendedor.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para los emprendedores
router.get("/", emprendedorController.getEmprendedores);
router.get(
  "/:id",
  authorizationMw.isBusinessOwnerOrAdmin,
  emprendedorController.getEmprendedorById,
);
router.get(
  "/:id/productos",
  authorizationMw.isBusinessOwnerOrAdmin,
  emprendedorController.getProductosByEmprendedor,
);
router.get(
  "/:id/ayudantes",
  authorizationMw.isBusinessOwnerOrAdmin,
  emprendedorController.getAyudantesByEmprendedor,
);
router.post(
  "/",
  authorizationMw.isOwnerOrAdmin,
  emprendedorController.createEmprendedor,
);
router.put(
  "/:id",
  authorizationMw.isOwnerOrAdmin,
  emprendedorController.updateEmprendedor,
);
router.delete(
  "/:id",
  authorizationMw.isOwnerOrAdmin,
  emprendedorController.deleteFullEmprendedorById,
);

// Exporta el enrutador
module.exports = router;
