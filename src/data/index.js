const {Context} = require('Context');
const {useContext} = require('react');
const languages = require('./languages.json');
const classes = require('./classes.json');
const camps = require('./camps.json');
const parascolaires = require('./parascolaires.json');
const parascolaires_details = require('./parascolaires_details.json');

const toImport = [
  'data',
  'locations',
  'weeks',
  'general',
  'boring',
  'information',
  'register',
  'products',
  'navigation',
  'contact'
];
const JSONs = Object.fromEntries(languages.map((language) => [
  language,
  Object.fromEntries(toImport.map((file) => [file, require(`./${language}/${file}.json`),]))
]));
console.log(JSONs)

Object.filter = (obj, predicate) => Object.keys(obj)
  .filter((key) => predicate(obj[key]))
  .reduce((res, key) => ((res[key] = obj[key]), res), {});

const useData = (id) => {
  const state = useContext(Context)[0];
  
  return {
    ...JSONs[state.language],
    camps,
    classes: Object.filter(classes, (doc) => doc.active),
    id_specific: classes[id] || camps[id] || parascolaires[id] || parascolaires_details[id],
    ...JSONs[state.language]['data']
  };
};

export default useData;
