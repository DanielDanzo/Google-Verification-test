// Import the functions you need from the SDKs you need
//import { signInWithPopup, getRedirectResult, GoogleAuthProvider , signInWithRedirect, initializeApp, getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, linkWithCredential, EmailAuthProvider, signOut } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"
//import { initializeApp } from "./node_modules/firebase/app/firebase-app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"
//import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "./node_modules/firebase/app/firebase-auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpsbqDksFVO0JpBqZT4gUGa-qW5PDIyVU",
  authDomain: "funding-requests-management.firebaseapp.com",
  projectId: "funding-requests-management",
  storageBucket: "funding-requests-management.appspot.com",
  messagingSenderId: "663669566432",
  appId: "1:663669566432:web:d34a19ea3989a6c3ce5985",
  measurementId: "G-YW4KG1DXWX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



//SIGN-IN WITH GOOGLE
//create google instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const user = auth.currentUser;


function registerUser(){
    //sign-in using small window prompt
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        window.location.href ='https://danieldanzo.github.io/Google-Verification-test/home.html';
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

const btn_submit_signup = document.getElementById('btn-submit-signup');

btn_submit_signup.addEventListener('click', ()=>{
    const userName = document.getElementById('fullname');
    const userEmail = document.getElementById('email');
    const userIDNum = document.getElementById('ID');
    const userReason = document.getElementById('Reason');
    const userRole = document.getElementById('Type');


    if(userName.value && userEmail.value && userIDNum.value && userReason.value && userRole.value){
        registerUser();
    }
    //alert('Hello');
    
})

