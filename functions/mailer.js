const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const { v4 } = require('uuid');

const fixedData = require(path.join(__dirname, 'data/fixed.json'));

const { contact, new_con } = require('./mails/plain');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'login',
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass,
  },
});
const from = 'Info ILPlatform <info@ilplatform.be>';
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

exports.newRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let uid = v4();
    const language = req.body.data.language;
    const mailData = fixedData[language].class.general;

    admin
      .firestore()
      .collection('Registrations')
      .doc(uid)
      .set({ ...req.body.data })
      .then(() =>
        admin
          .firestore()
          .collection('Classes')
          .where('classID', '==', req.body.data.group)
          .get()
          .then((snapshot) => snapshot?.docs[0]?.data())
          .then((data) => ({
            ...req.body.data,
            ...data,
            amount: data.price.amount,
            time: data.time.start,
            day: mailData.days[data.day],
            moment: mailData.moments[data.moment],
            loc: mailData.locations[data.loc].long,
          }))
          .then((data) => {
            admin.firestore().collection('Emails').doc(uid).set(data);
          })
          .then(() => res.send({ status: 200, data: { uid } }))

          .catch((error) => {
            console.log(error);
            res.send({ status: 400, data: { error } });
          })
      )
      .catch((error) => {
        console.log(error);
        res.send({ status: 400, data: { error } });
      });
  });
});

exports.newContact = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { data } = req.body;
    const dest = req.body.data.email;

    Promise.all([
      ejs.renderFile(path.join(__dirname, 'mails/html/contact.ejs'), data),
      ejs.renderFile(path.join(__dirname, 'mails/html/new_con.ejs'), data),
    ])
      .then((htmls) => ({
        contact: {
          from,
          replyTo: 'info@ilplatform.be',
          to: dest,
          subject: 'Contact Inquiry for ILPlatform',
          text: contact(data),
          html: htmls[0],
          attachments,
        },
        new_con: {
          from,
          replyTo: 'info@ilplatform.be',
          to: 'info@ilplatform.be',
          subject: 'New Contact for ILPlatform',
          text: new_con(data),
          html: htmls[1],
          attachments,
        },
      }))
      .then((mailData) => {
        transporter.sendMail(mailData.new_con, () => {
          transporter.sendMail(mailData.contact, (error, info) =>
            res.send({ status: 200, data: info })
          );
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: 400, data: { error } });
      });
  });
});
