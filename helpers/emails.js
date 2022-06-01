// Importando Nodemailer
import nodemailer from "nodemailer";

// Email de Registro
const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  // Credenciales y configuracion nodemailer
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4f0e0111e6b96d",
      pass: "56024117a48805",
    },
  });

  // Informacion del email
  const info = await transport.sendMail({
    from: '"MoviesDB" <cuentas@moviesdb.com>',
    to: email,
    subject: "MoviesDB - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en MoviesDB",
    // Cuerpo del email, etiquetas y estilos.(En enlace apunta a la ruta para confirmar usuario)
    html: `
    <p>Hola: ${nombre} Comprueba tu cuenta en MoviesDB</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    </p>
    `,
  });
};

// Email de Recuperar Contraseña
const emailRecuperarContraseña = async (datos) => {
  const { email, nombre, token } = datos;

  // Credenciales y configuracion nodemailer
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4f0e0111e6b96d",
      pass: "56024117a48805",
    },
  });

  // Informacion del email
  const info = await transport.sendMail({
    from: '"MoviesDB" <cuentas@moviesdb.com>"',
    to: email,
    subject: "MoviesDB - Reestablece tu contraseña",
    text: "Reestablece tu contraseña en MoviesDB",
    // Cuerpo del email, etiquetas y estilos.(En enlace apunta a la ruta para cambiar contraseña)
    html: `
    <p>Hola: ${nombre} has solicitado reestablecer tu password</p>
    <p>Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>

        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    </p>
    `,
  });
};

export { emailRegistro, emailRecuperarContraseña };
