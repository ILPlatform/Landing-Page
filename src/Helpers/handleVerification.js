import {callFunction} from 'firebase';

const verifyData = (data, setError) => {
  setError({});
  let errors = {};
  const addError = (key, err) => (errors[key] = err);
  let valid = true;
  // if (data.name !== undefined && !data.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
  //   valid = false;
  //   addError('name', 'Not a valid name');
  // }
  // if (data.first !== undefined && !data.first.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
  //   valid = false;
  //   addError('first', 'Not a valid name');
  // }
  // if (data.last !== undefined && !data.last.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
  //   valid = false;
  //   addError('last', 'Not a valid name');
  // }
  // if (data.name !== undefined && !data.name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
  //   valid = false;
  //   addError('name', 'Not a valid name');
  // }
  // if (data.name_child !== undefined && !data.name_child.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
  //   valid = false;
  //   addError('name_child', 'Not a valid name');
  // }
  // if (data.email !== undefined && !data.email.match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])$/)) {
  //   valid = false;
  //   addError('email', 'Not a valid email address');
  // }
  if (data.email !== undefined && !data.email) {
    valid = false;
    addError('email', 'Cannot be empty');
  }
  // if (data.phone !== undefined && !data.phone.match(/^\+?[\d\s]+$/)) {
  //   valid = false;
  //   addError('phone', 'Not a valid phone number');
  // }
  // if (data.phone !== undefined && !data.phone) {
  //   valid = false;
  //   addError('phone', 'Cannot be empty');
  // }
  // if (data.birthday !== undefined && !data.birthday) {
  //   valid = false;
  //   addError('birthday', 'Cannot be empty');
  // }
  // if (data.selected !== undefined && !data.selected) {
  //   valid = false;
  //   addError('selected', 'Please select a session');
  // }
  // if (data.subject !== undefined && !data.subject) {
  //   valid = false;
  //   addError('subject', 'Cannot be empty');
  // }
  setError(errors);
  return valid
}

const registrationVerification = (e, setError, customerInfo, setLoading, classData, dataG, language) => {
  console.log(classData)
  e.preventDefault();
  if (verifyData(customerInfo, setError)) {
    setLoading(true);
    const paymentData = {
      ...customerInfo,
      amount: classData?.price[0],
      name: 'Cours de programmation ILPlatform',
      description: `Cours à ${dataG?.locations[classData?.loc]?.short}: ${classData?.dates[0]} - ${classData?.dates[1]}, ${classData?.time?.start}-${classData?.time?.end}`,
      language,
      id: classData?.classID}
    callFunction('landing-initiatePayment')(paymentData).then(({data}) => (window.location.href = data))
  }
};

const registrationCampVerification = (e, setError, customerInfo, id, setLoading, classData, dataG, language) => {
  e.preventDefault();
  if (verifyData(customerInfo, setError)) {
    setLoading(true);
    const paymentData = {
      ...customerInfo,
      amount: classData?.price?.amount,
      name: 'Stage de programmation ILPlatform',
      description: `Stage à ${dataG?.locations[classData?.loc]?.short}: ${dataG?.weeks[classData?.days]?.start} - ${dataG?.weeks[classData?.days]?.end}, ${classData?.time?.start}-${classData?.time?.end}`,
      language,
      id}
    callFunction('landing-initiatePayment')(paymentData).then(({data}) => (window.location.href = data))
  }
};

const registrationParascolaireVerification = (e, setError, data, params, setLoading, classData, language) => {
  e.preventDefault();
  if (verifyData(data, setError)) {
    setLoading(true);
    const paymentData = {
      ...data,
      amount: classData?.price[0],
      name: classData?.title,
      description: classData?.description,
      language,
      ...params
    }
    callFunction('landing-initiatePayment')(paymentData).then(({data}) => (window.location.href = data))
  }
};

const contactVerification = (e, setError, data, setLoading, history) => {
  e.preventDefault();
  if (verifyData(data, setError)) {
    setLoading(true);
    callFunction('landing-newContact')(data).then(() => history.push(`/contact/success`));
  }
};

const demoVerification = (e, setError, data, history) => {
  e.preventDefault();
  if (verifyData(data, setError)) {
    callFunction('landing-newDemoRegistration')(data).then(() => history.push(`/demo/success`))
  }
};

export {registrationCampVerification, registrationVerification, registrationParascolaireVerification, contactVerification, demoVerification};
