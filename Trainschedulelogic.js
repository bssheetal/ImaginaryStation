  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCTc-fnY6H2tIITC5G8aY4izVRC_RI2aq0",
    authDomain: "trainscheduler-992fe.firebaseapp.com",
    databaseURL: "https://trainscheduler-992fe.firebaseio.com",
    projectId: "trainscheduler-992fe",
    storageBucket: "trainscheduler-992fe.appspot.com",
    messagingSenderId: "898054871422"
  };
  firebase.initializeApp(config);

  var database=firebase.database();

  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

  });