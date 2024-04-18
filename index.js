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
//const analytics = getAnalytics(app);


//send email to the user


/*
//get user email
email = 'sempapadaniel123@gmail.com';

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://danieldanzo.github.io/Google-Verification-test/home.html',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
};

const auth = getAuth(app);

sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
    // The link was successfully sent. Inform the user.
    console.log('Successfully logged in');
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
});

//complete signIn by checking whether the send link is the same as the link received from email
// Confirm the link is a sign-in with email link.
if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        console.log(result.user);
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        console.log(result.additionalUserInfo.isNewUser);
    })
    .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
    });
}*/

/*
//SingIn when user is already authentificated
//NOTE: -User has to login in the same device where he first logged in otherwise we re-authentificate
// Construct the email link credential from the current URL.
const credential = EmailAuthProvider.credentialWithLink(
    email, window.location.href);

// Link the credential to the current user.
linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
    // The provider is now successfully linked.
    // The phone user can now sign in with their phone number or email.
    })
    .catch((error) => {
    // Some error occurred.
    });
*/



/*
//Now we signOut the user
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});*/










//SIGN-IN WITH GOOGLE
//create google instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const user = auth.currentUser;

//sign-in using small window prompt
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log('Hello World!');
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

/*
//sign-in by redirecting
signInWithRedirect(auth, provider);

//Get Google Auth token
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

*/






//const clients = require('./clients.json');
//var clients;
var btn = document.getElementById('btn-signIn');

/*
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}*/


/*
function clickButton(){
    const aTag = document.getElementById('aTag');
    aTag.click();
}


function test(){
    /*
    var client = { 
        "name": "me",
        "Email": "me",
        "Image":  "me"
    }
    //const clien = getClients();
    //console.log(clients);
    //clients.push(client);
    //console.log(clients);
    //const aTag = document.getElementById('aTag');
    //aTag.click();8
    
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

}



function getClients(){
    fetch('https://danieldanzo.github.io/Google-Verification-test/clients.json')
        .then(response =>{
            console.log("Hello from ",response);
            console.log("Hello from json ");
            response.json();
        })
        .then(data =>{
            console.log("Hello ",data);
            //clients = data;
        })
    .catch((error)=>{
        console.log('Error: ',error);
    })
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        return true;
    //   authorizeButton.style.display = 'none';
    //   signoutButton.style.display = 'block';
    //   makeApiCall();
    } else {
        return false;
    //   authorizeButton.style.display = 'block';
    //   signoutButton.style.display = 'none';
    }
}*/

btn.addEventListener('click',()=>{
    console.log('Hello World!');
    alert('Hello');
    //signIn();
    /*
    isSignedIn = updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    if(isSignedIn){
        const aTag = document.getElementById('aTag');
        aTag.click();
        window.location.replace('https://danieldanzo.github.io/Google-Verification-test/home.html');
    }*/
})