"use strict";
const express = require("express");
const router = express.Router();

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Importa los enrutadores
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const carreraRoutes = require("./carrera.routes.js");
const ayudantesRoutes = require("./ayudantes.routes.js");
const productosRoutes = require("./productos.routes.js");
const emprendedoresRoutes = require("./emprendedores.routes.js");
const inscripcionRoutes = require("./inscripcion.routes.js");

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las carreras /api/carrera
router.use("/carrera", authenticationMiddleware, carreraRoutes);
// Define las rutas para los ayudantes /api/ayudantes
router.use("/ayudantes", authenticationMiddleware, ayudantesRoutes);
// Define las rutas para los productos /api/productos
router.use("/productos", authenticationMiddleware, productosRoutes);
// Define las rutas para los emprendedores /api/emprendedores
router.use("/emprendedores", authenticationMiddleware, emprendedoresRoutes);
// Define las rutas para las inscripciones /api/inscripcion
router.use("/inscripcion", authenticationMiddleware, inscripcionRoutes);

// Exporta el enrutador
module.exports = router;
