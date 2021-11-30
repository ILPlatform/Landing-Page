const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const stripe = require('stripe')(
  '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'
);
const { new_reg, confirmation, failed_reg } = require('./mails/plain');

exports.redirect = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    console.log(req.body.data);
    const { amount, uid, type } = req.body.data;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'bancontact'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Programming Classes',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/register-success/${uid}`,
      cancel_url: `${req.headers.origin}/register-failure/${type}/${uid}`,
    });
    try {
      res.send({ status: 303, data: { link: session.url } });
    } catch (error) {
      console.log(error);
    }
  });
});

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

exports.paymentSuccess = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    admin
      .firestore()
      .collection('Emails')
      .doc(req.body.data.uid)
      .get()
      .then((data) => data.data())
      .then((data) => {
        Promise.all([
          ejs.renderFile(
            path.join(__dirname, 'mails/html/confirmation.ejs'),
            data
          ),
          ejs.renderFile(path.join(__dirname, 'mails/html/new_reg.ejs'), data),
          confirmation(data),
          new_reg(data),
          data.email,
        ])
          .then((htmls) => ({
            confirmation: {
              from,
              replyTo: 'info@ilplatform.be',
              to: htmls[4],
              subject: 'ILPlatform - Registration Confirmation',
              text: htmls[2],
              html: htmls[0],
              attachments,
            },
            new_reg: {
              from,
              replyTo: 'info@ilplatform.be',
              to: 'info@ilplatform.be',
              subject: 'ILPlatform - New Registration',
              text: htmls[3],
              html: htmls[1],
              attachments,
            },
          }))
          .then((mailData) => {
            transporter.sendMail(mailData.new_reg, () => {
              transporter.sendMail(mailData.confirmation, () =>
                res.send({ status: 200, data: { uid: req.body.data.uid } })
              );
            });
          })
          .catch((error) => {
            console.log(error);
            res.send({ status: 400, data: error });
          });
      });
  });
});

exports.paymentFailure = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    admin
      .firestore()
      .collection('Emails')
      .doc(req.body.data.uid)
      .get()
      .then((data) => data.data())
      .then((data) => {
        Promise.all([
          ejs.renderFile(
            path.join(__dirname, 'mails/html/failed_reg.ejs'),
            data
          ),
          failed_reg(data),
        ])
          .then((htmls) => ({
            new_reg: {
              from,
              replyTo: 'info@ilplatform.be',
              to: 'info@ilplatform.be',
              subject: 'ILPlatform - FAILED Registration',
              text: htmls[1],
              html: htmls[0],
              attachments,
            },
          }))
          .then((mailData) => {
            transporter.sendMail(mailData.new_reg, () => {
              res.send({ status: 200, data: { uid: req.body.data.uid } });
            });
          })
          .catch((error) => {
            console.log(error);
            res.send({ status: 400, data: error });
          });
      });
  });
});
