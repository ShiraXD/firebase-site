

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_D_K5nzPXcn2Bt_xjuGmJYvZJ305xJ_E",
  authDomain: "moveotask-8f410.firebaseapp.com",
  databaseURL: "https://moveotask-8f410-default-rtdb.firebaseio.com",
  projectId: "moveotask-8f410",
  storageBucket: "moveotask-8f410.appspot.com",
  messagingSenderId: "44140992588",
  appId: "1:44140992588:web:52682cbcd9b2b30b057ce9",
  measurementId: "G-CSRX0YB9ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();



function onSubmitClick()
{
    //alert("Thanks");
}

window.onProfileBodyLoad = function onProfileBodyLoad()
{
    console.log("Loaded");
    //console.log(auth.currentUser.uid);
    //asyncronic function- calls the function within when the user signs in or out
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);

    //user is signed in. read data
    readLoggedInUserData(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
}

window.verifyCredentials = function verifyCredentials()
{
    if(verifyEmail() == false)
    {
        return false;
    }
    if (verifyPassword() == false)
    {
        return false;
    }
    else
    {
        //continue to db auth
        console.log("Password is valid");
        signIn();

    }
}



function verifyPassword()
{
    var pw = document.getElementById("password").value;
    //check empty password field
    if(pw == "")
    {
        document.getElementById("message").innerHTML = "Password is empty";
        return false;
    }

    //minimum password length validation
    if(pw.length < 6)
    {
        document.getElementById("message").innerHTML = "Password length must be at least 6 characters";
        return false;
    }

    //check if contains number
    var regexNumber = /\d/g;
    if(regexNumber.test(pw) == false)
    {
        document.getElementById("message").innerHTML = "Password must contains at least one number";
        return false;
    }

    // check if contains letter
    var regexLetter = /[a-zA-Z]/g;
    if (regexLetter.test(pw) == false)
    {
        document.getElementById("message").innerHTML = "Password must contains at least one letter";
        return false;
    }
}

function verifyEmail()
{
    var email = document.getElementById("email").value;
    var regexEmail =  /(.+)@(.+){2,}\.(.+){2,}/;
    if (regexEmail.test(email) == false)
    {
        document.getElementById("message").innerHTML = "Email is not valid. Should be in a form of x@xx.xx";
        return false;
    }
}



function signIn()
{
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    //signInWithEmailAndPassword is asycronic function- runs only when the sign in is completed
    //readLoggedInUser is called inside so that it wont happen before the user is signed in--------------------------------
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signed in");
        var uid = user.uid;
        //const userId = auth.currentUser.uid;
        console.log(uid);
        //redirect ot profile page
        window.location.href = "profile.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
}


function readLoggedInUserData(user)
{

    const db = getDatabase();

    return onValue(ref(db, '/users/' + user.uid), (snapshot) => {
      const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log(snapshot.val().name);
      setProfile(snapshot.val(), user);


      // ...
    }, {
      onlyOnce: true
    });
}

function setProfile(userInfo, user)
{
    var name = document.getElementById("name");
    name.innerText=userInfo.name;
    var name = document.getElementById("address");
    name.innerText=userInfo.address;
    var name = document.getElementById("birthdate");
    name.innerText=userInfo.birthdate;
    var name = document.getElementById("email");
    name.innerText=user.email;
}