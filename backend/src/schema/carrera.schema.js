"use strict";
const Joi = require("joi");
const {Facultades, Sedes} = require("../constants/carrera.constants")

// Esquema de validación para el cuerpo de carrera
const carreraBodySchema = Joi.object({
    titulo: Joi.string().required().messages({
        "string.empty": "El titulo de la carrera no puede estar vacío.",
        "any.required": "El titulo de la carrera es obligatorio.",
        "string.base": "El tipo de la carrera debe ser de tipo string.",
    }),
    facultad: Joi.string().valid(...Facultades).required().messages({
        "string.empty": "La  facultad no puede estar vacía.",
        "any.required": "La facultad es obligatoria.",
        "string.base": "La facultad debe ser de tipo string.",
        "any.only": "El valor de la facultad no es válido.",
    }),
    sede: Joi.string().valid(...Sedes).required().messages({
        "string.empty": "La  sede no puede estar vacía.",
        "any.required": "La sede es obligatoria.",
        "string.base": "La sede debe ser de tipo string.",
        "any.only": "El valor de la sede no es válido.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const carreraIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

module.exports = { carreraBodySchema , carreraIdSchema};