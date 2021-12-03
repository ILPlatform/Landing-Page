const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const { sendMail } = require('./mail');

exports.paymentSuccess = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { uid } = req.body.data;
    admin
      .firestore()
      .collection('Emails')
      .doc(uid)
      .get()
      .then((data) => data.data())
      .then((data) => {
        console.log(data);
        sendMail(data, 'new_reg');
        sendMail(data, 'confirmation')
          .then((info) => res.send({ status: 200, data: { uid } }))
          .catch((error) => res.send({ status: 400, data: error }));
      });
  });
});

exports.paymentFailure = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const uid = req.body.data.uid;
    admin
      .firestore()
      .collection('Emails')
      .doc(uid)
      .get()
      .then((data) => data.data())
      .then((data) =>
        sendMail(data, 'failed_reg')
          .then(() => res.send({ status: 200, data: { uid } }))
          .catch((error) => res.send({ status: 400, data: error }))
      );
  });
});
