//const clients = require('./clients.json');
var clients;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    clickButton();
    
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