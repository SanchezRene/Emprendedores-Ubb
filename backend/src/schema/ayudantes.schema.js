"use strict";
const Joi = require("joi");

const ayudantesBodySchema = Joi.object({
  nombre: Joi.string().required().max(100).messages({
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
  emprendedorId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El emprendedorId no puede estar vacío.",
      "any.required": "El emprendedorId es obligatorio.",
      "string.base": "El emprendedorId debe ser de tipo string.",
      "string.pattern.base":
        "El emprendedorId proporcionado no es un ObjectId válido.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const ayudantesIdSchema = Joi.object({
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

module.exports = { ayudantesBodySchema, ayudantesIdSchema };
