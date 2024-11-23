import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyBIBUWdyhyuarvOPZBrXqSgeJxgInUwOq4",
  authDomain: "chatapp-f7b94.firebaseapp.com",
  projectId: "chatapp-f7b94",
  storageBucket: "chatapp-f7b94.appspot.com",
  messagingSenderId: "381363223346",
  appId: "1:381363223346:web:8fc1305512d2cd04ff752b",
  measurementId: "G-3Y5L3P22MY"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const messaging = getMessaging(app)
