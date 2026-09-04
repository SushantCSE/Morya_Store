const firebaseConfig = {
    apiKey: "AIzaSyBhndR9oFuLWEUVvDOQDzzepv2p7sGPKG4",
    authDomain: "moryastore-2a88e.firebaseapp.com",
    projectId: "moryastore-2a88e",
    storageBucket: "moryastore-2a88e.firebasestorage.app",
    messagingSenderId: "891569428587",
    appId: "1:891569428587:web:4712e19c6898e6471af92e",
    measurementId: "G-W32ZYR66CK"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();