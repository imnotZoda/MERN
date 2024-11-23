// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
    apiKey: "AIzaSyBIBUWdyhyuarvOPZBrXqSgeJxgInUwOq4",
    authDomain: "chatapp-f7b94.firebaseapp.com",
    projectId: "chatapp-f7b94",
    storageBucket: "chatapp-f7b94.appspot.com",
    messagingSenderId: "381363223346",
    appId: "1:381363223346:web:8fc1305512d2cd04ff752b",
    measurementId: "G-3Y5L3P22MY"
};


// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});