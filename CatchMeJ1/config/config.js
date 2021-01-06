// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyC_THD3Z8p3W7BS-gwcWAbc4VVQQaeaLKM",
    authDomain: "catchme-181fc.firebaseapp.com",
    databaseURL: "https://catchme-181fc-default-rtdb.firebaseio.com",
    projectId: "catchme-181fc",
    storageBucket: "catchme-181fc.appspot.com",
    messagingSenderId: "519411137053",
    appId: "1:519411137053:web:ac2655bf5235d658c2a4f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NE PAS OUBLIER DE CONFIGURER FIREBASE AUTH TO ANONYMOUS !!!

// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged((user) => {
  console.log("onAuthStateChanged");
  if (user) {
    console.log(user);
    // User is signed in.
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    // console.log(uid);
  } else {
    // No user is signed in.
  }
});

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("anonymously auth error ----- " + errorCode);
    console.log(errorCode);
  });

const DATABASE = firebase.database();

function SEND_MESSAGE(_data, path = PLAYER_ID) {
  // _data = {'data': _data, 't_created': Date.now()};
  DATABASE.ref(path).set(_data);
}