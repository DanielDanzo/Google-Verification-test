//const clients = require('./clients.json');
var clients;
var btn = document.getElementById('btn-signIn');

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}



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
    */
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
}

btn.addEventListener('submit',()=>{
    isSignedIn = updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    if(isSignedIn){
        const aTag = document.getElementById('aTag');
        aTag.click();
        window.location.replace('https://danieldanzo.github.io/Google-Verification-test/home.html');
    }
})