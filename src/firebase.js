import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyD1tfIUj4yDpSHPisG_AfH0ZQaGLCV0Qnw",
    authDomain: "todos-c65ed.firebaseapp.com",
    projectId: "todos-c65ed",
    storageBucket: "todos-c65ed.appspot.com",
    messagingSenderId: "220212871144",
    appId: "1:220212871144:web:72688d79def07b9ddeee5d",
    databaseURL: 'https://todos-c65ed-default-rtdb.europe-west1.firebasedatabase.app/'
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;