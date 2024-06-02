const Joi = require("joi");

const actividadBodySchema = Joi.object({
  emprendedorId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "El ID del emprendedor debe ser alfanumérico y tener 24 caracteres.",
      "string.empty": "El ID del emprendedor no puede estar vacío.",
      "any.required": "El ID del emprendedor es obligatorio.",
    }),
  productosId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "El ID del producto debe ser alfanumérico y tener 24 caracteres.",
      "string.empty": "El ID del producto no puede estar vacío.",
      "any.required": "El ID del producto es obligatorio.",
    }),
  categoria: Joi.string()
    .required()
    .valid("Reunión", "Taller", "Evento", "Otro")
    .messages({
      "any.only": "La categoría debe ser 'Reunión', 'Taller', 'Evento' u 'Otro'.",
      "string.empty": "La categoría no puede estar vacía.",
      "any.required": "La categoría es obligatoria.",
    }),
  nombre: Joi.string()
    .required()
    .max(100)
    .messages({
      "string.max": "El nombre de la actividad no puede tener más de 100 caracteres.",
      "string.empty": "El nombre de la actividad no puede estar vacío.",
      "any.required": "El nombre de la actividad es obligatorio.",
    }),
  descripcion: Joi.string()
    .required()
    .max(255)
    .messages({
      "string.max": "La descripción de la actividad no puede tener más de 255 caracteres.",
      "string.empty": "La descripción de la actividad no puede estar vacía.",
      "any.required": "La descripción de la actividad es obligatoria.",
    }),
  fechaInicio: Joi.date().required().messages({
    "date.base": "La fecha de inicio de la actividad debe ser válida.",
    "any.required": "La fecha de inicio de la actividad es obligatoria.",
  }),
  fechaFin: Joi.date()
    .required()
    .greater(Joi.ref('fechaInicio'))
    .messages({
      "date.base": "La fecha de fin de la actividad debe ser válida.",
      "date.greater": "La fecha de fin no puede ser anterior a la fecha de inicio.",
      "any.required": "La fecha de fin de la actividad es obligatoria.",
    }),
  horaInicio: Joi.date().required().messages({
    "date.base": "La hora de inicio de la actividad debe ser válida.",
    "any.required": "La hora de inicio de la actividad es obligatoria.",
  }),
  horaFin: Joi.date().required().messages({
    "date.base": "La hora de fin de la actividad debe ser válida.",
    "any.required": "La hora de fin de la actividad es obligatoria.",
  }),
  lugar: Joi.string().required().messages({
    "string.empty": "El lugar de la actividad no puede estar vacío.",
    "any.required": "El lugar de la actividad es obligatorio.",
  }),
  capacidadAsistentes: Joi.number().required().messages({
    "number.base": "La capacidad de asistentes debe ser un número.",
    "any.required": "La capacidad de asistentes es obligatoria.",
  }),
})
  .concat(
    Joi.object({
      fechaFin: Joi.date().greater(Joi.ref('fechaInicio')).messages({
        'date.greater': 'La fecha de fin no puede ser anterior a la fecha de inicio.',
      }),
    })
  )
  .concat(
    Joi.object().when(
      Joi.object({
        fechaInicio: Joi.date(),
        fechaFin: Joi.date(),
      }).unknown(),
      {
        is: Joi.object().entries({
          fechaInicio: Joi.date().required(),
          fechaFin: Joi.date().required(),
        }).and(
          Joi.object().entries({
            fechaInicio: Joi.date().required(),
            fechaFin: Joi.date().valid(Joi.ref('fechaInicio')),
          })
        ),
        then: Joi.object({
          horaInicio: Joi.date().required().less(Joi.ref('horaFin')).messages({
            'date.less': 'La hora de inicio debe ser anterior a la hora de fin.',
          }),
          horaFin: Joi.date().required().greater(Joi.ref('horaInicio')).messages({
            'date.greater': 'La hora de fin debe ser posterior a la hora de inicio.',
          }),
        }),
        otherwise: Joi.object(),
      }
    )
  )
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

const actividadIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "El ID de la actividad debe ser alfanumérico y tener 24 caracteres.",
      "string.empty": "El ID de la actividad no puede estar vacío.",
      "any.required": "El ID de la actividad es obligatorio.",
    }),
});

module.exports = { actividadBodySchema, actividadIdSchema };
