import firebase from 'firebase/compat/app';
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from 'firebase/functions';

import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBivMgQF_uNn7gm9-UwSRkm1CBVimMrrRo',
  authDomain: 'ilplatform.firebaseapp.com',
  projectId: 'ilplatform',
  storageBucket: 'ilplatform.appspot.com',
  messagingSenderId: '482052945832',
  appId: '1:482052945832:web:d80ac5ab412b3e82dfcf9d',
  measurementId: 'G-SR7EQBVXCX',
});

const firestore = firebase.firestore();
const functions = getFunctions(app);
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

const callFunction = (functionName) => httpsCallable(functions, functionName);

export { firestore, callFunction };
