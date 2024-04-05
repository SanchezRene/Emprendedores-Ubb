"use strict";
// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

/**
 * Comprueba si el usuario no es el propietario de los datos
   1.- A través del token JWT se obtiene el email del usuario
   2.- Si el id del usuario es igual al id del usuario que se quiere modificar, se permite la acción
 */
async function isOwner(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });

    if (user._id === req.params.userId) {
      next();
      return;
    }
    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isOwner");
  }
}

/**
 * Comprueba si el usuario es un administrador o si es el propietario de los datos, y permitiría el acceso a la ruta en cualquiera de esos casos.
 */
async function isOwnerOrAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });

    //array.includes(valueToFind[, fromIndex]) devuelve true si el valor es encontrado en el array.
    if (user._id === req.params.userId || user.roles.includes("admin")) {
      next();
      return;
    }
    return respondError(
      req,
      res,
      401,
      "El usuario NO es el propietario de los datos o no tiene rol de administrador",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isOwnerOrAdmin");
  }
}


module.exports = {
  isAdmin,
  isOwner,
  isOwnerOrAdmin
};
