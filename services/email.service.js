const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const enviarCorreoRenta = async (correo, datos) => {
  try {
    const result = await resend.emails.send({
      from: "Sistema de Rentas <onboarding@resend.dev>",
      to: correo,
      subject: "Nueva solicitud de renta",
html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color: #2c3e50; text-align: center;">
      📩 Nueva Solicitud de Renta
    </h2>

    <hr style="margin: 20px 0;" />

    <p><strong>👤 Usuario:</strong> ${datos.usuario}</p>
    <p><strong>🏠 Cuarto:</strong> ${datos.cuarto}</p>
    <p><strong>📅 Fecha inicio:</strong> ${datos.fechainicio}</p>
    <p><strong>📅 Fecha fin:</strong> ${datos.fechafin}</p>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 14px; color: #777;">
      Este mensaje fue generado automáticamente por el sistema.
    </p>

  </div>
</div>
`
    });

    console.log("📬 Respuesta de Resend:", result);

    return result;

  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    throw error;
  }
};

module.exports = { enviarCorreoRenta };