// import firebase from "firebase";
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAVQX0HgkVuW_uJKOMMAhxkbmdB9gL1dbY",
    authDomain: "whatsapp-front-78368.firebaseapp.com",
    projectId: "whatsapp-front-78368",
    storageBucket: "whatsapp-front-78368.appspot.com",
    messagingSenderId: "666338912130",
    appId: "1:666338912130:web:446f81bb81052b5105919b"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export {auth,provider};