const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const path = require('path');
const { v4 } = require('uuid');

const fixedData = require(path.join(__dirname, 'data/fixed.json'));

const { sendMail } = require('./mail');

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
    sendMail(req.body.data, {
      to: 'info@ilplatform.be',
      subject: 'New Contact for ILPlatform',
      template: 'contact_admin',
    });

    sendMail(req.body.data, {
      to: req.body.data.email,
      subject: 'Contact Inquiry for ILPlatform',
      template: 'contact_client',
    })
      .then((info) => res.send({ status: 200, data: info }))
      .catch((error) => res.send({ status: 400, data: error }));
  });
});
