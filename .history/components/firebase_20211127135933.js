import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDyNIh0hb6a0LsYDd0xQ9CNcQnAzBoF8qk",
        authDomain: "portforio-af60e.firebaseapp.com",
        projectId: "portforio-af60e",
        storageBucket: "portforio-af60e.appspot.com",
        messagingSenderId: "1012312844751",
        appId: "1:1012312844751:web:4f8865a5074fa3d695caba"
        });
  }
  

  export const auth = firebase.auth()
  export const db = firebase.firestore()
  const firebaseMessaging=firebase.messaging()
  firebaseMessaging.usePublicVapidkey(BG-RgYfC3GiG88VK15XGorektmWpvQVzCJCBqD_YfhYReSL_rsLNDxdiRh8P7cMz7gR_bX_Hct4yizVf62MMXU0)
  export const messaging = firebase.messaging()