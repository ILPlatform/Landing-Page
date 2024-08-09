const { useContext } = require("react");
const { Context } = require("../Context");
const languages = require("./languages.json");

const toImport = ["boring", "information", "navigation", "contact", "meet_and_code"];
const JSONs = Object.fromEntries(
  languages.map((language) => [
    language,
    Object.fromEntries(toImport.map((file) => [file, require(`./${language}/${file}.json`)])),
  ]),
);
// console.log(JSONs)

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

const useData = () => {
  const state = useContext(Context)[0];

  return {
    ...JSONs[state.language],
    ...JSONs[state.language]["data"],
    language: state.language,
  };
};

export default useData;
