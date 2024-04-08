'use strict';
const Joi = require("joi");

const inscripcionBodySchema = Joi.object({
    userId: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El userId no puede estar vacío.",
        "any.required": "El userId es obligatorio.",
        "string.base": "userId debe ser de tipo string.",
        "string.pattern.base": "El userId proporcionado no es un ObjectId válido.",
    }),
    emprendedorId: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El emprendedorId no puede estar vacío.",
        "any.required": "El emprendedorId es obligatorio.",
        "string.base": "emprendedorId debe ser de tipo string.",
        "string.pattern.base": "El emprendedorId proporcionado no es un ObjectId válido.",
    }),
    productosId: Joi.array().items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)).min(1).max(10).default([]).required().messages({
        "array.items": "productosId debe ser un array de strings que representen ObjectIds válidos.",
        "array.min": "productosId debe tener al menos un elemento.",
        "array.max": "arreglo de productosId no puede tener más de 10 elementos.",
    }),
    ayudantesId: Joi.array().items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)).max(3).default([]).messages({
        "array.items": "ayudantesId debe ser un array de strings que representen ObjectIds válidos.",
        "array.max": "arreglo de ayudantesId no puede tener más de 3 elementos.",
    }),
    estado: Joi.string().valid("pendiente", "aprobada", "rechazada", "sin inscripciones").default("sin inscripciones").messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "estado debe ser de tipo string.",
        "string.valid": "El estado debe ser uno de los valores permitidos.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const inscripcionIdSchema = Joi.object({
    id: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});