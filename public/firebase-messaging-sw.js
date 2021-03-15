importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

try{
    firebase.initializeApp({
        appId: "1:26977274015:web:35dc0496b9508f569d7aaa",
        projectId: "tutor-search-project",
        authDomain: "tutor-search-project.firebaseapp.com",
        storageBucket: "tutor-search-project.appspot.com",
        apiKey: "AIzaSyCKdkT084eg8McRLr1Lnw07pZ_6TyrQCp0",
        messagingSenderId: "26977274015",
        
    });
    const messaging = firebase.messaging();
}catch (err){
    console.log(err);
}