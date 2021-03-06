"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = (destEmail, destFirst, destLast, confirmUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || testAccount.user,
          pass: process.env.EMAIL_PASS || testAccount.pass
        }
      });
      let mailOptions = {
        from: `"Matcha" <noreply@matcha.com>`,
        to: `"${destFirst} ${destLast}" <${destEmail}>`,
        subject: "Bienvenue sur Matcha !",
        text: `Veuillez copier coller le lien dans votre navigateur: ${confirmUrl}`,
        html: `<p>Veuillez confirmer votre compte en cliquant sur le lien: <a href="${confirmUrl}">Confirmer mon compte.</a></p>`
      };
      let info = await transporter.sendMail(mailOptions);
      return resolve(info);
    } catch (e) {
      return reject(e);
    }
  });
};
module.exports = sendMail;
