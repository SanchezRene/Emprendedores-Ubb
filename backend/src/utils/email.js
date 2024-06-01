const { API_KEY } = require("../config/configEnv.js");
const { Resend } = require('resend');

const resend = new Resend(API_KEY);

async function enviarCorreo(report) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${report.email}`], // Persona a la que se le envía el reporte
      subject: 'Notificación de Actividad',
      html: `<strong>${report.mensaje}</strong>`, // Mensaje del reporte
    });

    if (error) {
      return { error };
    }

    return { data };
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return { error: err.message };
  }
}

module.exports = { enviarCorreo };
