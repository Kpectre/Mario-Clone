// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKlwVtFM61yf9mY4Jbwp1sB2BbinppbWc",
  authDomain: "mario-clone-10e11.firebaseapp.com",
  projectId: "mario-clone-10e11",
  storageBucket: "mario-clone-10e11.appspot.com",
  messagingSenderId: "433757734032",
  appId: "1:433757734032:web:2ea31b82bbab626f750415",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
