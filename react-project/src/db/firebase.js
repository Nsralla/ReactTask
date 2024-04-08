// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4_vYroVpU4Yf1Kfla6IWbRu8r4mro3OE",
    authDomain: "cards-react-dc456.firebaseapp.com",
    projectId: "cards-react-dc456",
    storageBucket: "cards-react-dc456.appspot.com",
    messagingSenderId: "839875024266",
    appId: "1:839875024266:web:2ba8923306542190bfe473",
    measurementId: "G-W0HT0DJ230",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
