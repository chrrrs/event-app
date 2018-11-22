import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBydd68ex9-vN-aRT9IM4huWE_wDuWn28o",
    authDomain: "event-webapp-bc94d.firebaseapp.com",
    databaseURL: "https://event-webapp-bc94d.firebaseio.com",
    projectId: "event-webapp-bc94d",
    storageBucket: "event-webapp-bc94d.appspot.com",
    messagingSenderId: "552374337223"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().enablePersistence()

export default firebase;