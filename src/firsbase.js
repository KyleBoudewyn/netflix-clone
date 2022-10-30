// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlTHr7eHyqjC-uAm8poPJHPR8_CqRYj0Y',
  authDomain: 'netflix-clone-6caff.firebaseapp.com',
  projectId: 'netflix-clone-6caff',
  storageBucket: 'netflix-clone-6caff.appspot.com',
  messagingSenderId: '498744784671',
  appId: '1:498744784671:web:1e31be5b1fe03581a4222a',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
// export default db;
