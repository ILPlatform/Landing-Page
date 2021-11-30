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
      .then(() => res.send({ status: 200, data: { text: 'success' } }));
  });
});
