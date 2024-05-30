import { API_KEY } from "../config/configEnv.js"; // falta importar la variable API_KEY
import { Resend } from 'resend';

export async function enviarCorreo(report) {
  const resend = new Resend(API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${report.email}`], // Persona a la que se le envía el reporte
    subject: 'Reporte',
    html: `<strong>${report.mensaje}</strong>`, // Mensaje del reporte
  });

  if (error) {
    return { error };
  }

  return { data };
}
