const clients = require('./clients.json');

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const aTag = document.getElementById('aTag');
    var client = { 
        "name": profile.getName(),
        "Email": profile.getEmail(),
        "Image":  profile.getImageUrl()
    }

    clients.push(client);
    aTag.click();
}

function test(){
    const aTag = document.getElementById('aTag');
    aTag.click();
}