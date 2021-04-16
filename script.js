//Creating varibles for initial htm elements that we need to intoract with.

var leaderboard = document.querySelector("#leaderboard");
var time = document.querySelector("#time");
var start = document.querySelector("#start");
var question = document.querySelector("#question");
var quizInfo = document.querySelector("#quizInfo");
var qArea = document.querySelector("#questionArea");

var qNumber = 0;
var score = 0;
var timeRemaining = 100;

//This objects stores all questions, answers and the true or false value of every answer option. This allows the quiz to be modified in one place.
var qAndA = {
    "What is 1+1?": { "1": "false", "2": "true", "3": "fals", "5": "false" },
    "What color is the sky?": { "green": "false", "red": "false", "blue": "true", "yellow": "false" }
};

//Here we create an array containing only the questions.
var questions = Object.keys(qAndA);

//Event listener makes the star button exavcute the game function. And allow the user to view the Leaderboard.
leaderboard.addEventListener("click", leaderBoard);
start.addEventListener("click", startQuiz);
start.addEventListener("click", function () {
    let interval = setInterval(function () {
        timeRemaining--;
        if (timeRemaining < 0) {
            time.textContent = "0";
        } else {
            time.textContent = timeRemaining;
        }
        if (timeRemaining < 1 || (document.querySelector("#aList") == null)) {
            clearInterval(interval);
            if (timeRemaining < 1) {
                quizEnd();
            }
        }
    }, 1000);
});

function leaderBoard() {
    leaderboard.removeEventListener("click", leaderBoard);
    quizInfo.remove();
    start.remove();
    question.textContent = "Leaderboard";
    var table = document.createElement("div");
    table.setAttribute("id", "table");
    qArea.appendChild(table);
    var leaderList = document.createElement("tr");
    for (var i = 0; i < 3; i++) {
        var data = document.createElement("th");
        if (i == 0) {
            data.textContent = "Name";
        } else if (i == 1) {
            data.textContent = "Score";
        } else {
            data.textContent = "Delete";
        }
        leaderList.appendChild(data);
    }

    table.appendChild(leaderList);
    scoreSorter = [];
    for (var i = 0; i < localStorage.length; i++) {
        var row = document.createElement("tr");
        var dataName = document.createElement("th");
        var dataScore = document.createElement("th");
        var dataDelete = document.createElement("th");
        dataDelete.setAttribute("id", "delete");
        dataName.textContent = localStorage.key(i);
        //console.log(dataName);
        dataScore.textContent = localStorage.getItem(localStorage.key(i));
        //console.log(dataName);
        dataDelete.textContent = "x";
        //console.log(dataName);
        row.appendChild(dataName);
        row.appendChild(dataScore);
        row.appendChild(dataDelete);

        if (scoreSorter.length == 0) {
            scoreSorter.push(row);
        } else {
            for (var n = 0; n < scoreSorter.length; n++) {
                if (row.children[1].textContent >= scoreSorter[n].children[1].textContent) {
                    scoreSorter.splice(n, 0, row);
                    break;
                }
            }
        }
    }

    for (var i = 0; i < scoreSorter.length; i++) {
        table.appendChild(scoreSorter[i]);
    }

    table.addEventListener("click", function (event) {
        var deleteBtn = event.target;
        if (deleteBtn.getAttribute("id") == "delete") {
            localStorage.removeItem(deleteBtn.parentElement.children[0].textContent);
            deleteBtn.parentElement.remove();
        }
    })

    var mainMenu = document.createElement("p");
    mainMenu.textContent = "Return To Main Menu"
    qArea.appendChild(mainMenu);
    mainMenu.addEventListener("click", function () {
        leaderboard.addEventListener("click", leaderBoard);
        table.remove();
        mainMenu.remove();
        question.textContent = "Coding Quiz";
        qArea.appendChild(quizInfo);
        qArea.appendChild(start);
    });

}

//Random integer function too help randomize question order.
function rand(max) {
    return Math.floor(Math.random() * max);
}

//This function controls the functionality of te game.
function startQuiz() {
    if (qNumber == 0) {
        quizInfo.remove();
        start.remove();
        var aList = document.createElement("ul");
        aList.setAttribute("id", "aList");
        qArea.appendChild(aList);

        aList.addEventListener("click", function (event) {
            var element = event.target;
            if (element.matches("li")) {
                if (element.getAttribute("data-correct") == "true") {
                    score++;
                } else {
                    timeRemaining -= 10;
                }
                qNumber++;
                while (document.querySelector("#aList").firstChild) {
                    document.querySelector("#aList").removeChild(document.querySelector("#aList").lastChild);
                }
                if (questions.length == 0) {
                    quizEnd();
                } else {
                    startQuiz();
                }

            }
        })
    }

    //This block chooses the question.
    var qIndex = rand(questions.length);
    question.textContent = questions[qIndex];
    var answerKey = qAndA[questions[qIndex]];
    questions.splice(qIndex, 1);
    var answers = Object.keys(answerKey);
    var correct = Object.values(answerKey);
    var answerRandomizer = []
    for (var i = 0; i < answers.length; i++) {
        answerRandomizer.push(i);
    }

    //This loop generated the list items that are the answer options.
    for (var i = 0; i < answers.length; i++) {
        var answer = document.createElement("li");
        var aIndex = rand(answerRandomizer.length);
        answer.textContent = answers[answerRandomizer[aIndex]];
        answer.setAttribute("data-correct", correct[answerRandomizer[aIndex]]);
        document.querySelector("#aList").appendChild(answer);
        answerRandomizer.splice(aIndex, 1);
    }
}

function quizEnd() {
    document.querySelector("#aList").remove();
    question.textContent = "All Done!";

    var result = document.createElement("p");
    result.textContent = "Your score is: " + score;
    qArea.appendChild(result);

    var instructions = document.createElement("p");
    instructions.textContent = "Enter th name you want to display on the Leaderboard"
    qArea.appendChild(instructions);

    var username = document.createElement("input");
    username.setAttribute("type", "text");
    username.setAttribute("id", "username");
    username.setAttribute("value", "Enter Your Name");
    qArea.appendChild(username);

    var submit = document.createElement("p");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    qArea.appendChild(submit);

    submit.addEventListener("click", function () {
        localStorage.setItem(username.value, score);

        question.textContent = "Coding Quiz"
        result.remove();
        instructions.remove();
        username.remove();
        submit.remove();

        qArea.appendChild(quizInfo);
        qArea.appendChild(start);

        qNumber = 0;
        score = 0;
        timeRemaining = 100;
        questions = Object.keys(qAndA);
    })
}