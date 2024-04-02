"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ayudantesService = require("../services/ayudantes.service");
const ayudantesSchema = require("../schema/ayudantes.schema");
const { handleError } = require("../utils/errorHandler");

async function getAyudantes(req, res) {
    try {
      const [ayudantes, errorAyudantes] = await ayudantesService.getAyudantes();
      if (errorAyudantes) return respondError(req, res, 404, errorCarreras);
  
      ayudantes.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, ayudantes);
    } catch (error) {
      handleError(error, "ayudantes.controller -> getAyudantes");
      respondError(req, res, 400, error.message);
    }
  }

  async function getAyudanteById(req, res) {
    try {
      const { params } = req;
      const { error: paramsError } =
        ayudantesSchema.ayudantesIdSchema.validate(params);
      if (paramsError) return respondError(req, res, 400, paramsError.message);
  
      const [ayudante, errorAyudante] = await ayudantesService.getAyudanteById(
        params.id,
      );
      if (errorAyudante) return respondError(req, res, 404, errorAyudante);
  
      respondSuccess(req, res, 200, ayudante);
    } catch (error) {
      handleError(error, "ayudantes.controller -> getAyudanteById");
      respondError(req, res, 400, error.message);
    }
  }


  /**
   * OJO: se debe validar el formato del id del emprendedor
   */
async function getAyudantesByEmprendedorId(req, res) {
    const emprendedorId = req.params.id;
    try {
        const [ayudantes, errorAyudantes] = await ayudantesService.getAyudantesByEmprendedorId(emprendedorId);
        if (errorAyudantes) return respondError(req, res, 404, errorAyudantes);

        ayudantes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ayudantes);
    } catch (error) {
        handleError(error, "ayudantes.controller -> getAyudantesByEmprendedorId");
        respondError(req, res, 400, error.message);
    }
}

async function createAyudante(req, res) {
    try {
      const { body } = req;
      const { error: bodyError } = ayudantesSchema.ayudantesBodySchema.validate(body);
      if (bodyError) return respondError(req, res, 400, bodyError.message);
  
      const [newAyudante, ayudanteError] = await ayudantesService.createAyudante(body);
  
      if (ayudanteError) return respondError(req, res, 400, ayudanteError);
      if (!newAyudante) {
        return respondError(req, res, 400, "No se creo el ayudante");
      }
  
      respondSuccess(req, res, 201, newAyudante);
    } catch (error) {
      handleError(error, "ayudantes.controller -> createAyudante");
      respondError(req, res, 500, "No se creo el ayudante");
    }
  }

    async function updateAyudante(req, res) {
        try {
        const { params, body } = req;
        const { error: paramsError } =
            ayudantesSchema.ayudantesIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const { error: bodyError } = ayudantesSchema.ayudantesBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
    
        const [updatedAyudante, ayudanteError] = await ayudantesService.updateAyudanteById(
            params.id,
            body,
        );
        if (ayudanteError) return respondError(req, res, 404, ayudanteError);
    
        respondSuccess(req, res, 200, updatedAyudante);
        } catch (error) {
        handleError(error, "ayudantes.controller -> updateAyudante");
        respondError(req, res, 400, error.message);
        }
    }

    async function deleteAyudante(req, res) {
        try {
        const { params } = req;
        const { error: paramsError } =
            ayudantesSchema.ayudantesIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
    
        const [deletedAyudante, ayudanteError] = await ayudantesService.deleteAyudante(
            params.id,
        );
        if (ayudanteError) return respondError(req, res, 404, ayudanteError);
    
        respondSuccess(req, res, 200, deletedAyudante);
        } catch (error) {
        handleError(error, "ayudantes.controller -> deleteAyudante");
        respondError(req, res, 400, error.message);
        }
    }

module.exports = {
    getAyudantes,
    getAyudanteById,
    getAyudantesByEmprendedorId,
    createAyudante,
    updateAyudante,
    deleteAyudante,
  };