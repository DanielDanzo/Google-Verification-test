//const clients = require('./clients.json');

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var name = profile.getName();
    var email = profile.getEmail();
    var image = profile.getImageUrl();
    console.log(name);
    console.log(email);
    console.log(image);
    var client = { 
        "name": name,
        "Email": email,
        "Image":  image
    }
    const clients = await getClients();
    clients.push(client);
    console.log(clients);

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
    const clients = await getClients();
    clients.push(client);
    console.log(clients);
    const aTag = document.getElementById('aTag');
    aTag.click();
}



async function getClients(){
    fetch('https://danieldanzo.github.io/Google-Verification-test/clients.json')
        .then((data)=>{
            data.json();
        })
        .then((response)=>{
            return response;
        })
    .catch((error)=>{
        console.log('Error: ',error);
    })
}