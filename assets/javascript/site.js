$(document).ready(function(){

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

        var trainName = $("#inputName").val().trim();
        var trainDes = $("#inputDes").val().trim();
        var trainFreq = $("#inputFreq").val().trim();
        var trainTime = $("#inputTime").val().trim();


        database.ref().push({
            name: trainName,
            minutes: trainFreq,
            destination: trainDes,
            time: trainTime,
        });

        $("#inputName").val("");
        $("#inputDes").val("");
        $("#inputFreq").val(0);

    });

    // Use "child-added" which creates a new object
    database.ref().on("child_added", function(childSnapshot) {

        //variables for the Snapshots
        var trainName = childSnapshot.val().name;
        var trainDes = childSnapshot.val().destination;
        var trainFreq = childSnapshot.val().minutes;
        var trainTime = childSnapshot.val().time;


        // Log Childsnapshots for ref
        console.log(childSnapshot.val());
        console.log(trainName);
        console.log(trainDes);
        console.log(trainFreq);
        console.log(trainTime);

        //convert time for first train
        var firstTrain = moment(trainTime, "HH:mm").subtract(1, "years");
        
        //current time (momentjs)
        var currentTime = moment();

        // Difference between the current and Time
        var timeDiff = moment().diff(firstTrain, "minutes");
        console.log(timeDiff);

        var remainder = timeDiff % trainFreq;
        console.log("remaining time: " + remainder);

        var timeUntil = trainFreq - remainder;
        console.log("time until next train: " + timeUntil);

        var nextTrain = moment().add(timeUntil, "minutes");
        var trainFormat = moment(nextTrain).format("HH:mm");

        //couldn't figure out how to make it reset to the next time.
        //var timeUntil = moment(firstTrain).fromNow();
        //couldn't get this to work...
        //var finalTime = moment.duration(timeNew).asMinutes();
        //console.log(timeUntil);
        //didn't work
        //console.log(finalTime);


        //it's not pretty, but it works...
        $("#myTable").append(
            "<tr>" + "<td>" + 
            trainName + 
            "</td>" + "<td>" + 
            trainDes + 
            "</td>" + "<td>" + 
            trainFreq + 
            "</td>" + "<td>" + 
            trainTime +
            "</td>" + "<td>" +
            trainFormat +
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
});