var request = require('superagent');

var mailchimpInstance = 'us20',
  listUniqueId = '98bb038e35',
  mailchimpApiKey = 'a59c768911706be7518978ce469bd06b-us20';

exports.addUserToMailChimp = (email) =>
  request
    .post(
      'https://' +
        mailchimpInstance +
        '.api.mailchimp.com/3.0/lists/' +
        listUniqueId +
        '/members/'
    )
    .set('Content-Type', 'application/json;charset=utf-8')
    .set(
      'Authorization',
      'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64')
    )
    .send({
      email_address: email,
      status: 'subscribed',
    });
