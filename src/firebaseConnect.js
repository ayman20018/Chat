import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBxI00OLMxfszt4y9wzNNGUkXfP6w_7LSc",
      authDomain: "chatapp-a6a16.firebaseapp.com",
      projectId: "chatapp-a6a16",
      storageBucket: "chatapp-a6a16.appspot.com",
      messagingSenderId: "361007071015",
      appId: "1:361007071015:web:69aa2b1444072d3fb3f302",
      measurementId: "G-Z8CG7X7D85"
  })

export default app