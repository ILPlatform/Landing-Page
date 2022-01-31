const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const classes = require('../data/classes.json');

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

exports.getData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { classID, type } = req.body.data;

    switch (req.body.data.dataName) {
      case 'classlist':
        // admin
        //   .firestore()
        //   .collection('Classes')
        //   .orderBy('classID')
        //   .get()
        //   .then((snapshot) => {
        //     let tempData = {};
        //     snapshot.forEach((doc) => (tempData[doc.id] = doc.data()));
        //     return tempData;
        //   })
        //   .then((data) => Object.filter(data, (doc) => doc.type === type))
        //   .then((data) => res.send({ status: 200, data: { classes: data } }));
        // let tempData = {};
        // classes.forEach((doc) => (tempData[doc.id] = doc.data()));
        res.send({
          status: 200,
          data: { classes: Object.filter(classes, (doc) => doc.type === type) },
        });
        break;
      case 'classdetails':
        // admin
        //   .firestore()
        //   .collection('Classes')
        //   .where('classID', '==', classID)
        //   .get()
        //   .then((snapshot) => snapshot.docs[0].data())
        //   .then((data) => res.send({ data }));
        res.send({ status: 200, data: classes[classID] });
        break;
      case 'registration':
        // admin
        //   .firestore()
        //   .collection('Classes')
        //   .where('classID', '==', classID)
        //   .get()
        //   .then((snapshot) => snapshot.docs[0].data())
        //   .then((data) => res.send({ status: 200, data }));
        res.send({ status: 200, data: classes[classID] });
        break;
      default:
        res.send({ status: 404, data: {} });
        break;
    }
  });
});
