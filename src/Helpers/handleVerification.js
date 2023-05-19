import {callFunction} from 'firebase';

const verifyData = (data, setError) => {
  setError({});
  let errors = {};
  const addError = (key, err) => (errors[key] = err);
  let valid = true;
  if (data.email !== undefined && !data.email) {
    valid = false;
    addError('email', 'Cannot be empty');
  }
  setError(errors);
  return valid
}

const contactVerification = (e, setError, data, setLoading, history) => {
  e.preventDefault();
  if (verifyData(data, setError)) {
    setLoading(true);
    callFunction('landing-newContact')(data).then(() => history.push(`/contact/success`));
  }
};

export {contactVerification};
