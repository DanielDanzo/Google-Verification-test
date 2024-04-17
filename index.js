//const clients = require('./clients.json');
var clients;

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


function test(){
    var client = { 
        "name": "me",
        "Email": "me",
        "Image":  "me"
    }
    const clien = getClients();
    console.log(clients);
    //clients.push(client);
    console.log(clients);
    const aTag = document.getElementById('aTag');
    //aTag.click();
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
            clients = data;
        })
    .catch((error)=>{
        console.log('Error: ',error);
    })
}