const admin = require('firebase-admin');
const { newRegistration, newContact } = require('./mailer');
const { getData } = require('./getData');
const { createClass } = require('./createClass');
const { redirect, paymentSuccess, paymentFailure } = require('./payment');
admin.initializeApp();

exports.redirect = redirect;
exports.createClass = createClass;
exports.getData = getData;
exports.newRegistration = newRegistration;
exports.newContact = newContact;
exports.paymentSuccess = paymentSuccess;
exports.paymentFailure = paymentFailure;
