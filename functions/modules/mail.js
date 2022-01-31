const functions = require('firebase-functions');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

const { templates } = require('../mails/plain');
const { addUserToMailChimp } = require('./mailchimp');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'login',
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass,
  },
});

const from = 'Info ILPlatform <noreply@ilplatform.be>';
const replyTo = 'info@ilplatform.be';
const attachments = [
  {
    filename: 'ILPlatform_Banner.png',
    path: path.join(__dirname, 'mails/assets/ILPlatform_Banner.png'),
    cid: 'ILPlatform_Banner',
  },
  {
    filename: 'ILPlatform_Logo.png',
    path: path.join(__dirname, 'mails/assets/ILPlatform_Logo.png'),
    cid: 'ILPlatform_Logo',
  },
];

exports.sendMail = async (data, template) => {
  addUserToMailChimp(data.email);

  return ejs
    .renderFile(path.join(__dirname, `mails/html/${template}.ejs`), data)
    .then((html) => ({
      from,
      replyTo,
      ...templates[template](data),
      html,
      attachments,
    }))
    .then((mailData) => transporter.sendMail(mailData, (error, info) => info))
    .catch((error) => error);
};
