var firebaseConfig = {
    apiKey: "AIzaSyA_XPqhpWsJznGOlm8Vqla0YT2W4MQP0TY",
    authDomain: "number-guesser-2.firebaseapp.com",
    databaseURL: "https://number-guesser-2-default-rtdb.firebaseio.com",
    projectId: "number-guesser-2",
    storageBucket: "number-guesser-2.appspot.com",
    messagingSenderId: "58119280909",
    appId: "1:58119280909:web:89b6d6b133da7d05bcb844",
    measurementId: "G-MT7W6ZCPBY"
};

firebase.initializeApp(firebaseConfig);

stats = [0, 0, 0, 0];

if (localStorage.getItem("initalized") != "yes") {
    localStorage.setItem("initalized", "yes");
    localStorage.setItem("personalCorrect", 0);
    localStorage.setItem("personalTotal", 0);
};

function setStats() {
    stats[0] = getData("totalCorrect");
    stats[1] = getData("totalGuesses");
    stats[2] = localStorage.getItem("personalCorrect");
    stats[3] = localStorage.getItem("personalTotal");
    console.log(stats);
    document.getElementById("global").innerHTML = "A total of " + stats[0] + " correct guesses out of " + stats[1] + " total guesses globally made to date!";
    document.getElementById("personal").innerHTML = "You've made a total of " + stats[2] + " correct guesses out of " + stats[3] + " total guesses to date!";
};

function getNumber() {
    return Math.floor(Math.random() * 11);
}

correctNumber = getNumber();

function guess() {
    guessedNumber = document.getElementById("guessInput").value;
    document.getElementById("guessInput").value = "";
    if (guessedNumber == correctNumber) {
        document.getElementById("lga").innerHTML = "Last Guess Result: Correct";
        localStorage.setItem("personalCorrect", (Number(localStorage.getItem("personalCorrect")) + 1));
    } else if (correctNumber != guessedNumber) {
        document.getElementById("lga").innerHTML = "Last Guess Result: Incorrect";
    }
    document.getElementById("lg").innerHTML = "Last Guess: " + guessedNumber;
    document.getElementById("lca").innerHTML = "Last Correct Answer: " + correctNumber;
    localStorage.setItem("personalTotal", (Number(localStorage.getItem("personalTotal")) + 1));
    correctNumber = getNumber();
}


function check() {
    if (document.getElementById("guessInput").value > 10) {
        document.getElementById("guessInput").value = 10;
    } else if (document.getElementById("guessInput").value < 0) {
        document.getElementById("guessInput").value = 0;
    }
}

function getData(setKey) {
    firebase.database().ref("/").on('value', function(snapshot) { 
        snapshot.forEach(function(childSnapshot) { 
            childKey  = childSnapshot.key; 
            childData = childSnapshot.val();
            if (setKey == childKey) {
                dataSet = childData;
                return dataSet;
            } 
        });
    });
}

console.log(getData("totalCorrect"));