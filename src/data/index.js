const { Context } = require('Context');
const { callFunction } = require('firebase');
const { useContext, useState, useEffect, useMemo } = require('react');
const dataEN = require('./dataEN.json');
const dataFR = require('./dataFR.json');

const dataGeneral = { en: dataEN, fr: dataFR };

const useData = (dataName, props = {}) => {
  const { type, id } = props;
  const state = useContext(Context)[0];
  const localData = useMemo(
    () => ({
      ...dataGeneral[state.language][dataName],
      ...dataGeneral[state.language]['general'],
    }),
    [state, dataName]
  );
  const [data, setData] = useState(localData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callFunction('getData')({
      language: state.language,
      dataName,
      type,
      classID: id,
    }).then((res) => {
      if (res.data === {}) {
        setData(localData);
      } else {
        setData({
          ...localData,
          ...res.data,
        });
        setLoading(false);
      }
    });
  }, [state.language, dataName, type, id, localData]);
  return [data, loading];
};

export default useData;
