import { callFunction } from 'firebase';

const postRegistration = async (data) => {
  return await callFunction('newRegistration')(data)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

const postContact = async (data) => {
  return await callFunction('newContact')(data)
    .then((response) => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

export { postRegistration, postContact };
