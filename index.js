//const clients = require('./clients.json');

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const image = profile.getImageUrl();
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

function test(){
    var client = { 
        "name": "me",
        "Email": "me",
        "Image":  "me"
    }
    clients.push(client);
    const aTag = document.getElementById('aTag');
    aTag.click();
}