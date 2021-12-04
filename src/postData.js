import { callFunction } from 'firebase';

const postRegistration = async (data) => {
  return await callFunction('newRegistration')(data)
    .then((response) => response.data)
    .catch(() => false);
};

const postContact = async (data) => {
  return await callFunction('newContact')(data)
    .then((response) => response.data)
    .catch(() => false);
};

export { postRegistration, postContact };
