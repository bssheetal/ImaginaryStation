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

var database = firebase.database();

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var trainname = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var traintime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(trainname);
    console.log(destination);
    console.log(traintime);
    console.log(frequency);

    database.ref("/trains").push({

        "trainname":trainname,
        "destination":destination,
        "traintime":traintime,
        "frequency":frequency
    });

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

database.ref("/trains").on("child_added",function(snapshot)
{
  
    console.log(snapshot.key);
    console.log(snapshot.val);

});