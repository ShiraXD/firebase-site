
var config = {
apiKey: "AIzaSyD_D_K5nzPXcn2Bt_xjuGmJYvZJ305xJ_E",
  authDomain: "moveotask-8f410.firebaseapp.com",
  databaseURL: "https://moveotask-8f410-default-rtdb.firebaseio.com/",
  projectId: "moveotask-8f410",
  storageBucket: "moveotask-8f410.appspot.com",
  messagingSenderId: "44140992588",
  appId: "1:44140992588:web:bda40b540ac3ea68057ce9",
  measurementId: "G-6DPY5K9P32"
};
firebase.initializeApp(config);
firebase.analytics();
var database = firebase.database();
var lastIndex = 0;

function onSubmitClick()
{
    //alert("Thanks");
}

function onBodyLoad()
{
    //alert("Loaded");
}

function verifyPassword() {
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

  else
  {
     alert("Password is correct"); //********rembver here call the requiered funtion to db!!
  }
}