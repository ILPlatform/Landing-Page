const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
console.log(functions.config());
const stripe = require('stripe')(functions.config().stripe.api);
const { sendMail } = require('./mail');

exports.redirect = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { amount, uid } = req.body.data;
    stripe.checkout.sessions
      .create({
        payment_method_types: ['card', 'ideal', 'bancontact'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Programming Classes for ${req.body.data?.name_child}`,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        customer_email: req.body.data?.email,
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/register-success/${uid}`,
        cancel_url: `${req.headers.origin}/register-failure//${uid}`,
      })
      .then(({ url }) => res.send({ status: 303, data: { url } }));
  });
});

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
        sendMail(data, 'new_reg');
        sendMail(data, 'confirmation')
          .then(() => res.send({ status: 200, data: { uid } }))
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
