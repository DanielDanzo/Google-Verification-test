import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs, doc, query, where, orderBy, updateDoc, or  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDpsbqDksFVO0JpBqZT4gUGa-qW5PDIyVU",
    authDomain: "funding-requests-management.firebaseapp.com",
    databaseURL: "https://funding-requests-management-default-rtdb.firebaseio.com",
    projectId: "funding-requests-management",
    storageBucket: "funding-requests-management.appspot.com",
    messagingSenderId: "663669566432",
    appId: "1:663669566432:web:d34a19ea3989a6c3ce5985",
    measurementId: "G-YW4KG1DXWX"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//intialise app variables
//Get references to buttons
const addBtn = document.getElementById('addSum');
const getBtn = document.getElementById('getSum');
const addUserAppBtn = document.getElementById('addUserApp');
const updateSignInBtn = document.getElementById('updateSignIn');
const getUserAppBtn = document.getElementById('getUserApp');
const getOrderedUserApp = document.getElementById('getOrderedUserApp');
const allInfo = document.getElementById('Client-info'); //This is the part where we display operation status
const appInfo = document.getElementById('App-info'); //This is where we display info we want to display
const email = "2508872@students.wits.ac.za";
var userID = [];
var userApplications = [];  //Array that contains all the user applications in our database
var users = [];  //Array tha contains all the users we have in our database
var fundingOpportunities = [];   //Array that contains all the Funding Opportunities we have in the database


//==================================================Users==============================================================

//Function that displays the Applictions made byt specific user
function displayApplications(){
  userApplications.forEach((data)=>{
    const ID = data.userID;
    const STATUS = data.status;
    const SUBMITDATE = data.submitDate;
    const CLOSINGDATE = data.closingDate;

    const IDTag = document.createElement('p');
    const STATUSTag = document.createElement('p');
    const SUBMITDATETag = document.createElement('p');
    const CLOSINGDATETag = document.createElement('p');

    IDTag.textContent = ID;
    STATUSTag.textContent = STATUS;
    SUBMITDATETag.textContent = SUBMITDATE;
    CLOSINGDATETag.textContent = CLOSINGDATE;

    const group = document.createElement('div');
    group.appendChild(IDTag);
    group.appendChild(STATUSTag)
    group.appendChild(SUBMITDATETag)
    group.appendChild(CLOSINGDATETag)

    group.style.display ="flex";
    group.style.alignItems = "center"
    group.style.justifyContent = "space-between";
    appInfo.appendChild(group);
  });
}


//TODO: fix it so you can update user information
async function updateSignIn(userID){
  
  try {
    const q = doc(db, "users", userID);
    await updateDoc(q, {
      isSignIn: false, 
    })
    .then(()=>{
      allInfo.textContent = "Updated Sucessfully";
    })
    .catch((error)=>{
      console.error("Error updating document: ", error)
    });
    
  } catch (e) {
    console.error("Error updating document: ", e);
}
}

/*  FUNCTION: Adds user to the database
*   PARAMETERS: email- User email that we need to has
*               role- specifies the role of the user
*               isSignIn- specifies whether or not user is SignedIn
*               token- this is the token received from google signIn
*   TODO: Hash email address for security issues
*/
async function addUser(email, role, isSignIn, userToken){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          Email: email,
          Role: role,
          isSignIn: isSignIn,
          Token: userToken
        });
        userID.push(docRef.id);
        allInfo.textContent = "Sucessfully Added";
      } catch (e) {
        console.error("Error adding document: ", e);
    }
}


/*  FUNCTION: Creates and/or adds a subcollection
*   In this case it creates a subcollection that stores all user Applications
*   PARAMS: userID- is the userID that comes from the database and is used to get the user document
*           After getting user document we create a collection in that user document
*   TODO: be able to update status
*/
async function addUserApplication(userID, closingDate){
  try {

      // Reference to the user document
      const userRef = doc(db, 'users', userID);

      // Reference to the subcollection
      const applicationsRef = collection(userRef, 'Applications');
      const currentDate = new Date().toLocaleDateString();

      const docRef = await addDoc(applicationsRef, {
        userID: userID,
        status: "Pending",
        submitDate: currentDate,
        closingDate: closingDate
      });
      allInfo.textContent = "Added Application Sucessfully";
    } catch (e) {
      console.error("Error adding document: ", e);
  }
}


/*  FUNCTION: returns an array full of all the users in the database
*   Updates users array which we can use to see all users in the database
*/
async function getUsers(){
  const querySnapshot = await getDocs(collection(db, "users"));
  users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
}


/*  FUNCTION: returns an array full of all the applications made by user in the database
*   PARAMS: userID- used to navigate to user documents
*   Updates userApplication array which we can use to see all users in the database
*/
async function getUserApplications(userID){
  const querySnapshot = await getDocs(collection(db, "users", userID, "Applications"));
  userApplications = [];
  querySnapshot.forEach((doc) => {
    userApplications.push(doc.data());
  });
  displayApplications();
}


/*  FUNCTION: Unrelated but this functions retrieves a specific doc from the user
*   PARAMS: userID- inorder to retrieve this information we specify the userID
*   Updates users array which will only store the document of the specific user
*/
async function getSpecificUser(userID){
  const q = query(doc(db, "users", userID));
  const querySnapshot = await getDocs(q);
  users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
}

/*  FUNCTION: gets all the applications associated with a user from the latest to the oldest
*   PARAMS: userID- will be used to loacte or specify the user we want to see all the applications
*   Then userApplications will be used to display all the applications associated with the user along with the contents
*/
async function getAllApplications(userID){
  userApplications = [];
  const q = query(collection(db, 'users', userID, 'Applications'), where("status", "==", "approved"), orderBy("submitDate", "asc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userApplications.push(doc.data());
  });
  
  displayApplications();
}

/*   FUNCTION: Used to help us find the userID  of a specific user which will be used through out our query searches
*   PARAMS: email- will be used to find the row that contains the email, essentially locating the user
*   TODO: Hash the email so it can correspond with the hashed email in our database
*   This funtion returns the userID of a user
*/  
async function getUserID(email){
  try {
    const q = query(collection(db, 'users'), where('Email', '==', email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      userID = doc.id;
    });
  } catch (error) {
    console.error(error);
  }
  
}

//When the page loads we want to fetch the userID immediately
window.onload = getUserID(email);

//======================================Funding Opportunities===========================================================
async function createFundingOportunity(FOName,type,budget,description){
  try {
    const docRef = await addDoc(collection(db, "Funding Opportunity"), {
      Name: FOName,
      Type: type,
      Budget: budget,
      Description: description
    });
    fundingOpportunities.push(docRef.id);
    allInfo.textContent = "Sucessfully Added";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


//=========================================OUR Button Event Listeners ==================================================
addBtn.addEventListener('click', ()=>{
    addUser(email,"Admin",true,"Token");
});

getBtn.addEventListener('click', ()=>{
  //getUserID(email);
  getUsers();
});

addUserAppBtn.addEventListener('click', ()=>{
  addUserApplication(userID, new Date().toLocaleDateString());
});

getUserAppBtn.addEventListener('click',()=>{
  getUserApplications(userID);
});

getOrderedUserApp.addEventListener('click',()=>{
  getAllApplications(userID);
});

updateSignInBtn.addEventListener('click',()=>{
  updateSignIn(userID);
});










/*
get elements using queries
const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});


//creates a subcollection in a document
async function addUserSubCollection(){
  try {
      const docRef = await addDoc(collection(db, "users","tNg0DCaEmI7b1aKBMkG4","Application"), {
        status: "Pending",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("Document written with ID: ", docRef2.id);
    } catch (e) {
      console.error("Error adding document: ", e);
  }
}


//gets subcollections of user using user ID
async function getUsersID(){
  const userID = "tNg0DCaEmI7b1aKBMkG4"
  const querySnapshot = await getDocs(collection(db, "users", userID,"Application"));
  let i = 0;
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
    //console.log(`${doc.id} => ${doc.data()}`);
    if(i == 11){
      doc
    }
  });
  console.log(querySnapshot);
  console.log(users);
}



var citiesRef = collection(db, "users");
  citiesRef.where("country", "==", "USA").orderBy("submitDate", "desc")

*/