const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const enviarCorreoRenta = async (correo, datos) => {
  try {
    const result = await resend.emails.send({
      from: "Sistema de Rentas <onboarding@resend.dev>",
      to: correo,
      subject: "Confirmación de Renta - Cozzy House",
      html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color: #2c3e50; text-align: center;">
      🏠 Confirmación de Renta
    </h2>

    <hr style="margin: 20px 0;" />

    <p><strong>👤 Inquilino:</strong> ${datos.inquilino}</p>
    <p><strong>🏠 Cuarto:</strong> ${datos.cuarto}</p>
    <p><strong>📅 Fecha Inicio:</strong> ${datos.fechaInicio}</p>
    <p><strong>📅 Fecha Fin:</strong> ${datos.fechaFin}</p>
    <p><strong>💵 Monto por Mes:</strong> $${datos.montoPorMes}</p>
    <p><strong>📌 Estado:</strong> ${datos.status}</p>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 14px; color: #777;">
      Este mensaje fue generado automáticamente por el sistema Cozzy House.
    </p>

  </div>
</div>
      `
    });

    console.log("📬 Correo de renta enviado:", result);
    return result;
  } catch (error) {
    console.error("❌ Error enviando correo de renta:", error);
    throw error;
  }
};

const enviarCorreoPago = async (correo, datos) => {
  try {
    const result = await resend.emails.send({
      from: "Sistema de Rentas <onboarding@resend.dev>",
      to: correo,
      subject: "Orden de Pago - Cozzy House",
      html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color: #2c3e50; text-align: center;">
      💰 Orden de Pago
    </h2>

    <hr style="margin: 20px 0;" />

    <p><strong>👤 Inquilino:</strong> ${datos.inquilino}</p>
    <p><strong>🏠 Cuarto:</strong> ${datos.cuarto}</p>
    <p><strong>💵 Monto:</strong> $${datos.monto}</p>
    <p><strong>📅 Periodo:</strong> ${datos.periodoPago}</p>
    <p><strong>📌 Estado:</strong> ${datos.estado}</p>
    <p><strong>📝 Notas:</strong> ${datos.notas || "Sin notas"}</p>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 14px; color: #777;">
      Este mensaje fue generado automáticamente por el sistema Cozzy House.
    </p>

  </div>
</div>
      `
    });

    console.log("📬 Correo de pago enviado:", result);
    return result;
  } catch (error) {
    console.error("❌ Error enviando correo de pago:", error);
    throw error;
  }
};

module.exports = { enviarCorreoRenta, enviarCorreoPago };