"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const InscripcionService = require("../services/inscripcion.service");
const EmprendedorService = require("../services/emprendedor.service");
const InscripcionSchema = require("../schema/inscripcion.schema");
const ProductosService = require("../services/productos.service");
const { handleError } = require("../utils/errorHandler");

async function getInscripcionesSummary(req, res) {
  try {
    const [inscripciones, errorInscripciones] =
      await InscripcionService.getInscripcionesSummary();
    if (errorInscripciones)
      return respondError(req, res, 404, errorInscripciones);

    inscripciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, inscripciones);
  } catch (error) {
    handleError(error, "inscripcion.controller -> getInscripcionesSummary");
    respondError(req, res, 400, error.message);
  }
}

async function getInscripcionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.getInscripcionById(params.id);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> getInscripcionById");
    respondError(req, res, 400, error.message);
  }
}

async function createInscripcion(req, res) {
  try {
    const { body } = req;

    const { error: bodyError } =
      InscripcionSchema.inscripcionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.createInscripcion(body);

    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);
    if (!inscripcion)
      return respondError(req, res, 400, "No se creó la inscripción");

    respondSuccess(req, res, 201, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> createInscripcion");
    respondError(req, res, 400, error.message);
  }
}

async function updateInscripcion(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } =
      InscripcionSchema.inscripcionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.updateInscripcion(params.id, body);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    handleError(error, "inscripcion.controller -> updateInscripcion");
    respondError(req, res, 400, error.message);
  }
}

async function deleteInscripcion(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } =
      InscripcionSchema.inscripcionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [inscripcion, errorInscripcion] =
      await InscripcionService.deleteInscripcion(params.id);
    if (errorInscripcion) return respondError(req, res, 404, errorInscripcion);

    respondSuccess(
      req,
      res,
      200,
      "Inscripción eliminada satisfactoriamente",
      inscripcion,
    );
  } catch (error) {
    handleError(error, "inscripcion.controller -> deleteInscripcion");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  getInscripcionesSummary,
  getInscripcionById,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
};
