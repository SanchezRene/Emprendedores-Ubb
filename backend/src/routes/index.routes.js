"use strict";
const express = require("express");
const router = express.Router();

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Importa los enrutadores
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const carreraRoutes = require("./carrera.routes.js");

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las carreras /api/carrera
router.use("/carrera", authenticationMiddleware, carreraRoutes);


// Exporta el enrutador
module.exports = router;
