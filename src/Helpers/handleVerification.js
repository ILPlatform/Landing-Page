import { callFunction } from 'firebase';
import { postContact } from 'postData';
import { postRegistration, postDemoRegistration } from 'postData';

const handleVerification = (
  e,
  setError,
  data,
  params,
  setLoading,
  amount,
  type
) => {
  e.preventDefault();
  setError({});
  let errors = {};
  const addError = (key, err) => (errors[key] = err);
  let valid = true;

  // Name
  if (
    !data.name.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    valid = false;
    addError('name', 'Not a valid name');
  }

  // Email
  if (
    !data.email.match(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])$/
    )
  ) {
    valid = false;
    addError('email', 'Not a valid email address');
  }

  // Phone
  if (!data.phone.match(/^\+?[\d\s]+$/)) {
    valid = false;
    addError('phone', 'Not a valid phone number');
  }

  // Childs Name
  if (
    !data.name_child.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    valid = false;
    addError('name_child', 'Not a valid name');
  }

  // Childs Birthday
  if (!data.birthday) {
    valid = false;
    addError('birthday', 'Cannot be empty');
  }

  // Set the errors
  setError(errors);

  // Final step
  if (valid) {
    setLoading(true);

    postRegistration({ ...data, group: params.id }).then(({ uid }) => {
      console.log(uid);
      callFunction('redirect')({
        ...data,
        uid,
        amount,
        name_child: data.name_child,
        type,
      })
        .then((res) => res.data.url)
        .then((link) => (window.location.href = link));
    });
  }
};

const handleVerification2 = (e, setError, data, setLoading, history) => {
  e.preventDefault();
  setError({});
  let errors = {};
  const addError = (key, err) => (errors[key] = err);
  let valid = true;

  // First Name
  if (
    !data.first.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    valid = false;
    addError('first', 'Not a valid name');
  }

  // Last Name
  if (
    !data.last.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    valid = false;
    addError('last', 'Not a valid name');
  }

  // Email
  if (
    !data.email.match(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])$/
    )
  ) {
    valid = false;
    addError('email', 'Not a valid email address');
  }

  // Subject
  if (!data.subject) {
    valid = false;
    addError('subject', 'Cannot be empty');
  }

  // Childs Birthday
  if (!data.message) {
    valid = false;
    addError('message', 'Cannot be empty');
  }

  // Set the errors
  setError(errors);

  // Final step
  if (valid) {
    setLoading(true);
    postContact(data).then(() => history.push(`/contact-us/success`));
  }
};

const handleDemoRegistration = (e, setError, data, history) => {
  e.preventDefault();
  setError({});
  let errors = {};
  const addError = (key, err) => (errors[key] = err);
  let valid = true;

  // Childs Name
  if (
    !data.name_child.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    valid = false;
    addError('name_child', 'Not a valid name');
  }

  // Email
  if (
    !data.email.match(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])$/
    )
  ) {
    valid = false;
    addError('email', 'Not a valid email address');
  }

  // Phone
  if (!data.phone.match(/^\+?[\d\s]+$/)) {
    valid = false;
    addError('phone', 'Not a valid phone number');
  }

  // Childs Birthday
  if (!data.birthday) {
    valid = false;
    addError('birthday', 'Cannot be empty');
  }

  // Selected Demo
  if (!data.selected) {
    valid = false;
    addError('selected', 'Please select a session');
  }

  // Set the errors
  setError(errors);

  // Final step
  if (valid) {
    postDemoRegistration(data);
    history.push(`/demo/success`);
  }
};

export { handleVerification, handleVerification2, handleDemoRegistration };
