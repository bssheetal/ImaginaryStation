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
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    database.ref("/trains").push({

        "trainname": name,
        "traindestination": destination,
        "traintime": time,
        "trainfrequency": frequency
    });

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref("/trains").on("child_added", function (childsnapshot) {

    console.log(childsnapshot.key);
    console.log(childsnapshot.val());
    var trainobj = {
        key: childsnapshot.key,
        name: childsnapshot.val().trainname,
        destination: childsnapshot.val().traindestination,
        frequency: childsnapshot.val().trainfrequency
    };

    console.log(trainobj);

    var TFrequency = childsnapshot.val().trainfrequency;
    var firstTime = childsnapshot.val().traintime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % TFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = TFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("LT"));

    var trainObjString = JSON.stringify(trainobj);
    var tr = $("<tr>");
    tr.addClass(childsnapshot.key);
    tr.append(
        $("<td>").text(childsnapshot.val().trainname).addClass("name"),
        $("<td>").text(childsnapshot.val().traindestination).addClass("destination"),
        $("<td>").text(childsnapshot.val().trainfrequency).addClass("frequency"),
        $("<td>").text(moment(nextTrain).format("LT")).addClass("nextArrival"),
        $("<td>").text(tMinutesTillTrain).addClass("minsaway")
    );
    // Append the new row to the table
    $("#train-table > tbody").append(tr);

});