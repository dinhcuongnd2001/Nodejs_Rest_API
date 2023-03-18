"use strict";
const nodemailer = require("nodemailer");
const systemConfig = require("../configs/system");

const SendEmail = async (option) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: systemConfig.SMTP_HOST,
    port: systemConfig.SMTP_PORT,
    auth: {
      user: systemConfig.SMTP_EMAIL,
      pass: systemConfig.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${systemConfig.FROM_NAME} <${systemConfig.FROM_EMAIL}>`,
    to: option.email,
    subject: option.subject,
    text: option.message,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = SendEmail;
