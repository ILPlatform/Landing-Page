const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { v4 } = require('uuid');

const fixedData = require('../data/fixed.json');

const { sendMail } = require('./mail');

exports.newRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let uid = v4();
    const mailData = fixedData['en'].class.general;

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

exports.newDemoRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin
      .firestore()
      .collection('DemoRegistrations')
      .doc(v4())
      .set(req.body.data)
      .then(() => {
        sendMail(req.body.data, 'demo_admin');
        sendMail(req.body.data, 'demo_client')
          .then((info) => res.send({ status: 200, data: info }))
          .catch((error) => res.send({ status: 400, data: error }));
      });
  });
});

exports.newContact = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    sendMail(req.body.data, 'contact_admin');
    sendMail(req.body.data, 'contact_client')
      .then((info) => res.send({ status: 200, data: info }))
      .catch((error) => res.send({ status: 400, data: error }));
  });
});
