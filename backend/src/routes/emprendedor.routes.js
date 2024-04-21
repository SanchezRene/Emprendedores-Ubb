'use strict';

const emprendedorController = require("../controllers/emprendedor.controller.js");

const express = require("express");
const router = express.Router();

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

// Define las rutas para los emprendedores
router.get("/", emprendedorController.getEmprendedores);
router.get("/:id", emprendedorController.getEmprendedorById);
router.get("/:id/productos",authorizationMw.isBusinessOwnerOrAdmin, emprendedorController.getProductosByEmprendedor);
router.post("/",authorizationMw.isOwnerOrAdmin, emprendedorController.createEmprendedor);
router.put("/:id",authorizationMw.isOwnerOrAdmin, emprendedorController.updateEmprendedor);
router.delete("/:id",authorizationMw.isOwnerOrAdmin, emprendedorController.deleteEmprendedor);

// Exporta el enrutador
module.exports = router;
