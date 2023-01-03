const nodemailer = require('nodemailer');

/**
 * @name sendEmail
 * @param {string} petOwner - pet owner email and name
 * @param {string} careTaker   - care taker email and name
 * @param {string} emailtitle  - email title
 */
const sendEmail = async (petOwner, careTaker, emailtitle) => {
  let testAccount = await nodemailer.createTestAccount();
  // se crea el transportador reutilizable usando el default SMTP transport
  let transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const { petOwnerEmail, petOwnerName } = petOwner;
  const { careTakerEmail, careTakerName } = careTaker;

  // se envia el email con los objetos definidos
  let info = await transport.sendMail({
    from: `"${careTakerEmail} " <${careTakerName}>`,
    to: petOwnerEmail,
    subject: `Estimado ${petOwnerName} - ${emailtitle}`,
    text: 'Hola, su mascota ha sido registrada en el sistema de cuidado de animales del condominio. Su mascota es: ',
  });

  // se muestra la url de la cuenta de ethereal para ver el email enviado
  console.log('Message enviado: %s', info.messageId);
  // vista previa de la url de la cuenta de correo
  console.log(
    'Vista previa del correo URL: %s',
    nodemailer.getTestMessageUrl(info),
  );
};

module.exports = sendEmail;
