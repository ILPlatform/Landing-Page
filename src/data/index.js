const { Context } = require('Context');
const { callFunction } = require('firebase');
const { useContext, useState, useEffect } = require('react');
const dataEN = require('./dataEN.json');
const dataFR = require('./dataFR.json');

const dataGeneral = { en: dataEN, fr: dataFR };

const useData = (dataName, props = {}) => {
  const { type, id } = props;
  const state = useContext(Context)[0];
  const [data, setData] = useState(dataGeneral[state.language][dataName]);

  useEffect(() => {
    callFunction('getData')({
      language: state.language,
      dataName,
      type,
      classID: id,
    })
      .then((res) => {
        if (res.data === {}) {
          setData(dataGeneral[state.language][dataName]);
        } else {
          setData({
            ...dataGeneral[state.language][dataName],
            ...res.data,
          });
        }
      })
      .catch((error) => console.log('ERROR', error));
  }, [state.language, dataName, type, id]);
  return data;
};

export default useData;
