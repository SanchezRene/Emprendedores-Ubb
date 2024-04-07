'use strict';
const Joi = require("joi");

const productosBodySchema = Joi.object({
    nombre: Joi.string().required().max(100).messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "nombre debe ser de tipo string.",
        "string.max": "El nombre debe tener un máximo de 100 caracteres.",
    }), 
    fotografia: Joi.string().required().uri().messages({
        "string.empty": "La fotografia no puede estar vacía.",
        "any.required": "La fotografia es obligatoria.",
        "string.base": "fotografia debe ser de tipo string.",
        "string.uri": "La fotografia debe tener una URL válida.",
    }),
    descripcion: Joi.string().required().max(255).messages({
        "string.empty": "La descripcion no puede estar vacía.",
        "any.required": "La descripcion es obligatoria.",
        "string.base": "descripcion debe ser de tipo string.",
        "string.max": "La descripcion debe tener un máximo de 255 caracteres.",
    }),
    stock: Joi.number().required().min(1).max(300).messages({
        "number.empty": "El stock no puede estar vacío.",
        "any.required": "El stock es obligatorio.",
        "number.base": "stock debe ser de tipo number.",
        "number.min": "El stock debe ser mayor a 0.",
        "number.max": "El stock no puede ser más de 300.",
    }),
    emprendedorId: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El emprendedorId no puede estar vacío.",
        "any.required": "El emprendedorId es obligatorio.",
        "string.base": "El emprendedorId debe ser de tipo string.",
        "string.pattern.base": "El emprendedorId proporcionado no es un ObjectId válido.",
    }),
}).messages({   
    "object.unknown": "No se permiten propiedades adicionales.",
});

const productosIdSchema = Joi.object({
    id: Joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { productosBodySchema, productosIdSchema };


