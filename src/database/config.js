import firebase from 'firebase';

const firebaseConfig = {

    apiKey: "AIzaSyD7XLBKRXFL2wN1ifIaUaOR4UAdk_VqpFs",

    authDomain: "react2022-a74ad.firebaseapp.com",

    databaseURL: "https://react2022-a74ad-default-rtdb.firebaseio.com",

    projectId: "react2022-a74ad",

    storageBucket: "react2022-a74ad.appspot.com",

    messagingSenderId: "706320701539",

    appId: "1:706320701539:web:9e99c9babd149c49fa0056",

    measurementId: "G-2962VTG2BC"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let database = firebase.database()

export { database }

