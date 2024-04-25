import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


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
const addBtn = document.getElementById('addSum');
const getBtn = document.getElementById('getSum');
const allInfo = document.getElementById('Client-info');
const users = [];


//adds dummy data to the database
async function addUser(){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        const docRef2 = await addDoc(collection(db, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
          });
        console.log("Document written with ID: ", docRef.id);
        console.log("Document written with ID: ", docRef2.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getUsers(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.push(doc.data);
    console.log(`${doc.id} => ${doc.data()}`);
  });
  console.log(querySnapshot);
}

addBtn.addEventListener('click', ()=>{
    addUser();
});

getBtn.addEventListener('click', ()=>{
  getUsers();
  console.log(users);
});

