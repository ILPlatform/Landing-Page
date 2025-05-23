import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";

const app = initializeApp({
  apiKey: "AIzaSyBivMgQF_uNn7gm9-UwSRkm1CBVimMrrRo",
  authDomain: "ilplatform.firebaseapp.com",
  databaseURL: "https://ilplatform-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ilplatform",
  storageBucket: "ilplatform.appspot.com",
  messagingSenderId: "482052945832",
  appId: "1:482052945832:web:d80ac5ab412b3e82dfcf9d",
  measurementId: "G-SR7EQBVXCX",
});

const functions = getFunctions(app, "europe-west1");
if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const callFunction = (functionName) => httpsCallable(functions, functionName);

export { callFunction };
