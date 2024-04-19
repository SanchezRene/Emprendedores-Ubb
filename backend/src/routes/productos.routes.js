'use strict';
const bodyParser = require('body-parser');

const productosController = require("../controllers/productos.controller.js");

const express = require("express");
const router = express.Router();
const jsonParser = bodyParser.json({limit: '50mb'});

// Middlewares de autorización y autenticación
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");
router.use(authenticationMw);

//middeware de multer para subir archivos
const uploadImage = require("../utils/fileUploadHandler.js");

// Define las rutas para los productos
router.get("/", productosController.getProductos);
router.get("/:id", productosController.getProductoById);

router.post("/",authorizationMw.isOwnerOrAdmin, productosController.createProducto);
router.put("/:id",authorizationMw.isOwnerOrAdmin, productosController.updateProducto);

router.delete("/:id",authorizationMw.isOwnerOrAdmin, productosController.deleteProducto);

// Exporta el enrutador
module.exports = router;