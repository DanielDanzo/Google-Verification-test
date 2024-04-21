import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"
import { linkWithCredential, getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"

//Initailise everything
const firebaseConfig = {
    apiKey: "AIzaSyDpsbqDksFVO0JpBqZT4gUGa-qW5PDIyVU",
    authDomain: "funding-requests-management.firebaseapp.com",
    projectId: "funding-requests-management",
    storageBucket: "funding-requests-management.appspot.com",
    messagingSenderId: "663669566432",
    appId: "1:663669566432:web:d34a19ea3989a6c3ce5985",
    measurementId: "G-YW4KG1DXWX"
  };
const pTag = document.getElementById('Client-info');
const btn = document.getElementById('signOut');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//create google instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//Can be used to get the information of current user
const user = window.localStorage.getItem('UserInfo');
const user1 = auth.currentUser;
console.log(user);
console.log(user1.email);
console.log('Hello');
pTag.textContent = "Hello "+ user.Email;

btn.addEventListener('click', ()=>{
    //Now we signOut the user
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
});