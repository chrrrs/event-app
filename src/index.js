import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

ReactDOM.render(<App />, document.getElementById('root'));

let config = {
    apiKey: "AIzaSyBydd68ex9-vN-aRT9IM4huWE_wDuWn28o",
    authDomain: "event-webapp-bc94d.firebaseapp.com",
    databaseURL: "https://event-webapp-bc94d.firebaseio.com",
    storageBucket: "event-webapp-bc94d.appspot.com",
};

firebase.initializeApp(config);

window.firebase = firebase;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
