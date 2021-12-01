const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const path = require('path');
const fixedData = require(path.join(__dirname, 'data/fixed.json'));
const variableData = require(path.join(__dirname, 'data/variable.json'));

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

exports.getData = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const language = req.body.data.language;
    const classID = req.body.data.classID;
    const classType = req.body.data.type;

    switch (req.body.data.dataName) {
      case 'classlist':
        const classListData = {
          ...fixedData[language].class.classlist,
          ...fixedData[language].class.general,
        };
        admin
          .firestore()
          .collection('Classes')
          .orderBy('classID')
          .get()
          .then((snapshot) => {
            let tempData = {};
            snapshot.forEach((doc) => (tempData[doc.id] = doc.data()));
            return tempData;
          })
          .then((data) => Object.filter(data, (doc) => doc.type === classType))
          .then((data) => ({
            any: Object.keys(data)?.length > 0,
            keys: Object.keys(data)?.map((card) => data[card]?.classID),
            arrayKeys: [...Array(Object.keys(data)?.length || 0)?.keys()],
            cardTitles: Object.keys(data).map(
              (card) =>
                classListData?.days[data[card]?.day] +
                ' - ' +
                classListData?.moments[data[card]?.moment]
            ),
            agesFrom: Object.keys(data).map((card) => data[card]?.ages?.from),
            agesTo: Object.keys(data).map((card) => data[card]?.ages?.to),
            languages: Object.keys(data).map((card) =>
              data[card]?.languages
                ?.map(
                  (language, i) =>
                    classListData?.languages[language] +
                    (i !== data[card]?.languages?.length - 1 ? ' & ' : '')
                )
                .join('')
            ),
            cardDesc: Object.keys(data).map(
              (card) =>
                classListData?.description
                  ?.replace('#0', data[card]?.ages?.from)
                  .replace('#1', data[card]?.ages?.to) +
                data[card]?.languages
                  ?.map(
                    (language, i) =>
                      classListData?.languages[language] +
                      (i !== data[card]?.languages?.length - 1 ? ' & ' : '')
                  )
                  .join('')
            ),
            shortLoc: Object.keys(data).map(
              (card) => classListData?.locations[data[card]?.loc]?.short
            ),
            img: Object.keys(data).map((card) => data[card]?.img),
          }))
          .then((data) => res.send({ status: 200, data }))
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;
      case 'classdetails':
        const classDetailsData = {
          ...fixedData[language].class.classdetails,
          ...fixedData[language].class.general,
          ...variableData[language],
        };
        admin
          .firestore()
          .collection('Classes')
          .where('classID', '==', classID)
          .get()
          .then((snapshot) => snapshot.docs[0].data())
          .then((data) => ({
            infoDescs: [
              classDetailsData?.public
                .replace('#0', data?.ages?.from)
                .replace('#1', data?.ages?.to),
              classDetailsData?.locations[data?.loc]?.long,
              classDetailsData?.days[data?.day] +
                ' - ' +
                data?.time?.start +
                '-' +
                data?.time?.end,
              data?.languages?.map(
                (language, i) =>
                  classDetailsData?.languages[language] +
                  (i !== data?.languages?.length - 1 ? ' & ' : '')
              ),
              classDetailsData?.price
                ?.replace('#0', data?.price?.amount)
                .replace('#1', data?.price?.classes),
            ],
            img: data?.img,
            details: data?.details,
            example: data?.example,
          }))
          .then((data) => res.send({ data }));
        break;
      case 'registration':
        const registrationData = {
          ...fixedData[language].class.classdetails,
          ...fixedData[language].registration,
          ...fixedData[language].class.general,
          ...variableData[language],
        };
        admin
          .firestore()
          .collection('Classes')
          .where('classID', '==', classID)
          .get()
          .then((snapshot) => snapshot.docs[0].data())
          .then((data) => ({
            ...registrationData,
            infoTitles: registrationData.info,
            infoDescs: [
              registrationData?.public
                .replace('#0', data?.ages?.from)
                .replace('#1', data?.ages?.to),
              registrationData?.locations[data?.loc]?.long,
              registrationData?.days[data?.day] +
                ' - ' +
                data?.time?.start +
                '-' +
                data?.time?.end,
              data?.languages?.map(
                (language, i) =>
                  registrationData?.languages[language] +
                  (i !== data?.languages?.length - 1 ? ' & ' : '')
              ),
              registrationData?.price
                ?.replace('#0', data?.price?.amount)
                .replace('#1', data?.price?.classes),
            ],
            img: data?.img,
            amount: data?.price?.amount,
          }))
          .then((data) => res.send({ status: 200, data }));
        break;
      default:
        res.send({ data: {} });
        break;
    }
  });
});
