const Report = require("../models/report.model");
const { enviarCorreo } = require("../utils/email");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function createReport(req, res) {
  try {
    const { email, mensaje } = req.body;
    const report = new Report({ email, mensaje });
    await report.save();

    // Enviar el correo electrónico
    const emailReport = {
      email: report.email,
      mensaje: report.mensaje,
    };
    const { error } = await enviarCorreo(emailReport);
    if (error) {
      return respondError(req, res, 500, "Error al enviar el correo electrónico");
    }

    res.status(201).json(report);
  } catch (error) {
    handleError(error, "report.controller -> createReport");
    respondError(req, res, 500, "Error al crear el reporte");
  }
}

module.exports = { createReport };
