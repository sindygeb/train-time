
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZ2zi8Zk5aLcwG_5pTmof4fJnINluJeqU",
    authDomain: "sindy-train-time.firebaseapp.com",
    databaseURL: "https://sindy-train-time.firebaseio.com",
    projectId: "sindy-train-time",
    storageBucket: "",
    messagingSenderId: "1009508371692"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// button click event
$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#inputName").val().trim();
    trainDes = $("#inputDes").val().trim();
    trainFreq = $("#inputFreq").val().trim();
    trainTime = $("#inputTime").val().trim();


    database.ref().push({
        Name: trainName,
        Minutes: trainFreq,
        Destination: trainDes,
        Time: trainTime,
    });

    $("#inputName").val("");
    $("#inputDes").val("");
    $("#inputFreq").val(0);

});

// Use "child-added" which creates a new object
database.ref().on("child_added", function(snapshot) {

    // Log snapshots for ref
    console.log(snapshot.val());
    console.log(snapshot.val().Name);
    console.log(snapshot.val().Minutes);
    console.log(snapshot.val().Destination);
    console.log(snapshot.val().Time);

    var orgTime = moment(snapshot.val().Time, "HH:mm").format("h:mm A");
    var minAway;
    // convert train time from military to standard time
    var timeNew = moment(snapshot.val().Time, "h:mm A");
    // Difference between the current and Time
    var diffTime = moment().diff(moment(timeNew), "minutes");
    var remainder = diffTime % snapshot.val().Minutes;
    // Minutes until next train
    var minAway = snapshot.val().Minutes - remainder;
    // Next train time by adding minutes to the time
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("h:mm A");

    //couldn't figure out how to make it reset to the next time.
    var timeUntil = moment(timeNew).fromNow("mm");
    //couldn't get this to work...
    //var finalTime = moment.duration(timeNew).asMinutes();
    console.log(timeUntil);
    //didn't work
    //console.log(finalTime);


    //it's not pretty, but it works...
    $("#myTable").append(
        "<tr>" + "<td>" + 
        snapshot.val().Name + 
        "</td>" + "<td>" + 
        snapshot.val().Destination + 
        "</td>" + "<td>" + 
        snapshot.val().Minutes + 
        "</td>" + "<td>" + 
        orgTime +
        "</td>" + "<td>" +
        timeUntil +
        "</td>" + "</tr>"
        );


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

function pushData() {

};