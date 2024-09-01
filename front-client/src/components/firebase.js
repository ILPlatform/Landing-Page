import firebase from 'firebase/compat/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import 'firebase/compat/firestore';

// Initialize Firebase with your project's configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyBivMgQF_uNn7gm9-UwSRkm1CBVimMrrRo",
  authDomain: "ilplatform.firebaseapp.com",
  projectId: "ilplatform",
  storageBucket: "ilplatform.appspot.com",
  messagingSenderId: "482052945832",
  appId: "1:482052945832:web:d80ac5ab412b3e82dfcf9d",
  measurementId: "G-SR7EQBVXCX",
});

// Get Firebase Functions from the specified region
const functions = getFunctions(app, 'europe-west1');

// Define and export your callable function for form submissions
export const submitNewsletterSubscription = async (data) => {
  const functionRef = httpsCallable(functions, 'customers_e_create');
  try {
    const response = await functionRef(data);
    return response.data;  // Adjust based on your function's return structure
  } catch (error) {
    console.error("Error calling Firebase function:", error);
    throw error;
  }
};

// Directly call a Firebase function
const callFunction = async () => {
  const functionRef = httpsCallable(functions, "customers_e_create");
  try {
    const response = await functionRef({
      first_name: "Daniel",
      last_name: "Cortild",
      email: "daniel@ilplatform.be",
      phone: "+32 X",
      consent: "true",
    });
    console.log(response);
  } catch (error) {
    console.error("Error calling Firebase function:", error);
  }
};

// Call the function immediately
callFunction();

export { callFunction };