const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/enviar-correo", async (req, res) => {
  const { nombre, email, mensaje, capacitaciones, modalidad } = req.body;

  const content = `
    Nombre: ${nombre}
    Email: ${email}
    Mensaje: ${mensaje}
    Capacitación: ${capacitaciones.join(", ")}
    Modalidad: ${modalidad.join(", ")}
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: \`Formulario Web Grupo DI <\${process.env.EMAIL_USER}>\`,
      to: "contacto@grupodi.cl",
      subject: "Nueva consulta desde la web",
      text: content
    });

    res.status(200).send({ message: "Correo enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error al enviar el correo" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor funcionando en el puerto " + PORT));