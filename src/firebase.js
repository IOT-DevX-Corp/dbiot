// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnanb7oZ0LmlQrjb31NJLIxLi_GKPjBB4",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://iot-prj-ac910-default-rtdb.firebaseio.com",
    projectId: "iot-prj-ac910",
    storageBucket: "iot-prj-ac910.appspot.com",
    messagingSenderId: "678890602245",
    appId: "1:678890602245:android:5c24a1cedf20440e31016c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };