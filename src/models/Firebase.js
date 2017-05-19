var firebase = require('firebase');
//import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAGqDdVi",
  authDomain: "clients.firebaseapp.com",
  databaseURL: "https://clients.firebaseio.com",
  storageBucket: "clients.appspot.com",
  messagingSenderId: "150557"
};

const fbConnect = firebase.initializeApp(config);
const FBApp = fbConnect.database();

module.exports = FBApp;
