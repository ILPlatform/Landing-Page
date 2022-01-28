const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { v4 } = require('uuid');

exports.createClass = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin
      .firestore()
      .collection('Classes')
      .doc(v4())
      .set({
        classID: '1301',
        price: { amount: 345 },
        time: { start: '9:30', end: '17:30' },
        ages: { from: '6', to: '12' },
        days: { start: '03/01/2021', end: '07/01/2021' },
        partnerActivity: 'sport',
        // week: '03-07/01/2021',
        period: 'christmas',
        // moment: 'afternoon',
        loc: 'aspria-rasante',
        type: 'camps',
        img: 'https://firebasestorage.googleapis.com/v0/b/ilplatform.appspot.com/o/classes%2FThumbnail%20-%20Wonder%20Christmas.jpg?alt=media&token=344ed2ad-13aa-4ce2-8b6d-12b22b943695',
        languages: ['french', 'english'],
      })
      .then(() =>
        admin
          .firestore()
          .collection('Classes')
          .doc(v4())
          .set({
            classID: '2101',
            price: { amount: 99, classes: 4 },
            time: { start: '10:00', end: '11:30' },
            ages: { from: '6', to: '12' },
            day: 'saturday',
            moment: 'morning',
            loc: 'regent',
            type: 'onsite',
            details: 'scratch',
            example: 'scratch-piano',
            img: 'https://firebasestorage.googleapis.com/v0/b/ilplatform.appspot.com/o/classes%2FThumbnail%20-%20Robots%20Wonder.jpeg?alt=media&token=31ac0e4f-8916-49a9-8564-d075eb79046c',
            languages: ['french', 'english'],
          })
      )
      .then(() => res.send({ status: 200, data: { text: 'success' } }));
  });
});
