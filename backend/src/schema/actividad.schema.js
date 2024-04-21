const Joi = require("joi");

const actividadBodySchema = Joi.object({
  emprendedorId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID del emprendedor no puede estar vacío.",
      "any.required": "El ID del emprendedor es obligatorio.",
      "string.regex": "El ID del emprendedor debe ser alfanumérico y tener 24 caracteres.",
    }),
  productoId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID del producto no puede estar vacío.",
      "any.required": "El ID del producto es obligatorio.",
      "string.regex": "El ID del producto debe ser alfanumérico y tener 24 caracteres.",
    }),
  categoria: Joi.string()
    .required()
    .valid("Reunión", "Taller", "Evento", "Otro")
    .messages({
      "string.empty": "La categoría no puede estar vacía.",
      "any.required": "La categoría es obligatoria.",
      "any.only": "La categoría debe ser 'Reunión', 'Taller', 'Evento' u 'Otro'.",
    }),
  nombre: Joi.string()
    .required()
    .max(100)
    .messages({
      "string.empty": "El nombre de la actividad no puede estar vacío.",
      "any.required": "El nombre de la actividad es obligatorio.",
      "string.max": "El nombre de la actividad no puede tener más de 100 caracteres.",
    }),
  descripcion: Joi.string()
    .required()
    .max(255)
    .messages({
      "string.empty": "La descripción de la actividad no puede estar vacía.",
      "any.required": "La descripción de la actividad es obligatoria.",
      "string.max": "La descripción de la actividad no puede tener más de 255 caracteres.",
    }),
  fechaInicio: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha de inicio de la actividad debe ser válida.",
      "any.required": "La fecha de inicio de la actividad es obligatoria.",
    }),
  fechaFin: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha de fin de la actividad debe ser válida.",
      "any.required": "La fecha de fin de la actividad es obligatoria.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const actividadIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "El ID de la actividad no puede estar vacío.",
      "any.required": "El ID de la actividad es obligatorio.",
      "string.regex": "El ID de la actividad debe ser alfanumérico y tener 24 caracteres.",
    }),
});

module.exports = { actividadBodySchema, actividadIdSchema };


//fecha chilena actualizar//  
//redundantes