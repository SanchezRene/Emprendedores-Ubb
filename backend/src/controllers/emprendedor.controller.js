'use strict';

const { respondSuccess, respondError } = require("../utils/resHandler");
const EmprendedorService = require("../services/emprendedor.service");
const EmprendedorSchema = require("../schema/emprendedor.schema");
const { handleError } = require("../utils/errorHandler");

async function getEmprendedores(req, res) {
    try {
        const [emprendedores, errorEmprendedores] = await EmprendedorService.getEmprendedores();
        if (errorEmprendedores) return respondError(req, res, 404, errorEmprendedores);

        emprendedores.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, emprendedores);
    } catch (error) {
        handleError(error, "emprendedor.controller -> getEmprendedores");
        respondError(req, res, 400, error.message);
    }
}

async function getEmprendedorById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } =
            EmprendedorSchema.emprendedorIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [emprendedor, errorEmprendedor] = await EmprendedorService.getEmprendedorById(
            params.id,
        );
        if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

        respondSuccess(req, res, 200, emprendedor);
    } catch (error) {
        handleError(error, "emprendedor.controller -> getEmprendedorById");
        respondError(req, res, 400, error.message);
    }
}

async function createEmprendedor(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } =
            EmprendedorSchema.emprendedorBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [emprendedor, errorEmprendedor] = await EmprendedorService.createEmprendedor(body);
        if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

        respondSuccess(req, res, 201, emprendedor);
    } catch (error) {
        handleError(error, "emprendedor.controller -> createEmprendedor");
        respondError(req, res, 400, error.message);
    }
}

async function updateEmprendedor(req, res) {
    try {
        const { body, params } = req;
        const { error: bodyError } =
            EmprendedorSchema.emprendedorBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const { error: paramsError } =
            EmprendedorSchema.emprendedorIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [emprendedor, errorEmprendedor] = await EmprendedorService.updateEmprendedor(
            params.id,
            body,
        );
        if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

        respondSuccess(req, res, 200, emprendedor);
    } catch (error) {
        handleError(error, "emprendedor.controller -> updateEmprendedor");
        respondError(req, res, 400, error.message);
    }
}

async function deleteEmprendedor(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } =
            EmprendedorSchema.emprendedorIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [emprendedor, errorEmprendedor] = await EmprendedorService.deleteEmprendedor(
            params.id,
        );
        if (errorEmprendedor) return respondError(req, res, 404, errorEmprendedor);

        respondSuccess(req, res, 200, emprendedor);
    } catch (error) {
        handleError(error, "emprendedor.controller -> deleteEmprendedor");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getEmprendedores,
    getEmprendedorById,
    createEmprendedor,
    updateEmprendedor,
    deleteEmprendedor,
};