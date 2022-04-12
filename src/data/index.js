const {Context} = require('Context');
const {useContext, useState, useEffect, useMemo} = require('react');
const languages = require('./languages.json');
const classes = require('./classes.json');

const dataGeneral = Object.fromEntries(languages.map((language) => [language, require(`./data${language.toUpperCase()}.json`),]));

Object.filter = (obj, predicate) => Object.keys(obj)
  .filter((key) => predicate(obj[key]))
  .reduce((res, key) => ((res[key] = obj[key]), res), {});

const getData = ({dataName, classID = "", type = ""}) => {
  switch (dataName) {
    case 'classlist':
      return {
        classes: Object.filter(classes, (doc) => doc.type === type && doc.active),
      }
    case 'classdetails':
      return classes[classID]
    case 'registration':
      return classes[classID]
    default:
      return {}
  }
}

const useData = (dataName, props = {}) => {
  const {type, id} = props;
  const state = useContext(Context)[0];
  const localData = {
    ...dataGeneral[state.language][dataName], ...dataGeneral[state.language]['general'],
  }
  const data = {
    ...localData, ...getData({
      dataName, classID: id, type
    })}
  
  return data;
};

export default useData;
