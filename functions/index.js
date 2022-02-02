const admin = require('firebase-admin');
const {
  newRegistration,
  newDemoRegistration,
  newContact,
} = require('./modules/mailer');
const { getData } = require('./modules/getData');
const { createClass } = require('./modules/createClass');
const {
  redirect,
  paymentSuccess,
  paymentFailure,
} = require('./modules/payment');
admin.initializeApp();

exports.redirect = redirect;
exports.createClass = createClass;
exports.getData = getData;
exports.newRegistration = newRegistration;
exports.newDemoRegistration = newDemoRegistration;
exports.newContact = newContact;
exports.paymentSuccess = paymentSuccess;
exports.paymentFailure = paymentFailure;
