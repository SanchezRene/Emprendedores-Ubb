"use strict";
const Joi = require("joi");

const emprendedorBodySchema = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El userId no puede estar vacío.",
      "any.required": "El userId es obligatorio.",
      "string.base": "userId debe ser de tipo string.",
      "string.pattern.base":
        "El userId proporcionado no es un ObjectId válido.",
    }),
  nombre_completo: Joi.string().required().max(100).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "nombre debe ser de tipo string.",
    "string.max": "El nombre debe tener un máximo de 100 caracteres.",
  }),
  rut: Joi.string()
    .required()
    .pattern(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "any.required": "El rut es obligatorio.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "El rut proporcionado no es válido.",
    }),
  celular: Joi.string().required().min(9).max(15).pattern(/^\d+$/).messages({
    "string.empty": "El celular no puede estar vacío.",
    "any.required": "El celular es obligatorio.",
    "string.base": "celular debe ser de tipo string.",
    "string.min": "El celular debe tener un mínimo de 9 dígitos.",
    "string.max": "El celular debe tener un máximo de 15 dígitos.",
  }),
  carreraId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "carreraId no puede estar vacío.",
      "any.required": "El carreraId es obligatorio.",
      "string.base": "El carreraId debe ser de tipo string.",
      "string.pattern.base":
        "El carreraId proporcionado no es un ObjectId válido.",
    }),
  nombre_puesto: Joi.string().required().max(100).messages({
    "string.empty": "El nombre del puesto no puede estar vacío.",
    "any.required": "El nombre del puesto es obligatorio.",
    "string.base": "nombre_puesto debe ser de tipo string.",
    "string.max":
      "El nombre del puesto debe tener un máximo de 100 caracteres.",
  }),
  productosId: Joi.array()
    .items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/))
    .max(10)
    .default([])
    .messages({
      "array.items":
        "productosId debe ser un array de strings que representen ObjectIds válidos.",
      "array.max": "arreglo de productosId no puede tener más de 10 elementos.",
    }),
  ayudantesId: Joi.array()
    .items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/))
    .max(3)
    .default([])
    .messages({
      "array.items":
        "ayudantesId debe ser un array de strings que representen ObjectIds válidos.",
      "array.max": "arreglo de ayudantesId no puede tener más de 3 elementos.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const emprendedorIdSchema = Joi.object({
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

module.exports = { emprendedorBodySchema, emprendedorIdSchema };
