//Array of question objects received from Inna Widener on Slack
var quiz1 = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "2"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "2"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
        answer: "3"
    },
    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onmouseclick", "onmouseover", "onchange", "onclick"],
        answer: "3"
    },
    {
        title: "How do you declare a Javascript variable?",
        choices: ["variable carName", "var carName", "v carName", "const carname"],
        answer: "1"
    },
    {
        title: "How do you round the number 7.25, to the nearest integer?",
        choices: ["Math.round(7.25)", "rnd(7.25)", "Math.rnd(7.25)", "round(7.25)"],
        answer: "0"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets"],
        answer: "3"
    },
    {
        title: "Which HTML attribute is used to define inline styles?",
        choices: ["class", "font", "styles", "style"],
        answer: "3"
    },
    {
        title: "Which CSS property is used to change the text color of an element?",
        choices: ["text-color", "color", "fgcolor", "font-color"],
        answer: "1"
    },
    {
        title: "Which CSS property controls the text size?",
        choices: ["font-style", "text-style", "text-size", "font-size"],
        answer: "3"
    },
];
var highScoreNames = [];
var highScoreScores = [];

//get the previously stored high scores if any
if(JSON.parse(localStorage.getItem("highScoreNames"))!=null){
    highScoreNames = JSON.parse(localStorage.getItem("highScoreNames"));;
    highScoreScores = JSON.parse(localStorage.getItem("highScoreScores"));
}

//function that will sort the highScore list after being called
function sortScores(){
    //basically this function will take the two arrays, sort the scores, and set the index of the other
    //To print the high score page in order
    var tempScores = highScoreScores.slice(0);
    var tempNames = highScoreNames.slice(0);

    highScoreScores.sort(function(a,b){return b-a});
    for(i=0;i<tempNames.length;i++){
        //Have to admit, the following line of code gave me a headache, but I got it to work
        highScoreNames[i] = tempNames[tempScores.indexOf(highScoreScores[i])];
    }
}

var currentQuestion = 0;
var score = 0;

//This function will create a timer based on how long the quiz array passed inside is.
function setCountdown(quiz){
    var quizLength = 0;
    
    //will give 15 seconds per question, as to adapt to differant size quizzes.
    quizLength = quiz.length * 15;
    console.log("The quiz will be " + quizLength + " seconds");
    return quizLength;
};

//This count function will start to count down as soon as it's called
//Give it a time in seconds that it needs to count down.
function count(time){
    timeLeft = time;

    //setting up the countdown function inside of the actual count function call
    var timeInterval = setInterval(function(){
        timeLeft--;

        //update the html timer
        $(".timer").text("Time left: " + timeLeft + " seconds.");
        //console.log(timeLeft + " seconds left.");
        
        //To end the timer
        if(timeLeft === 0 || timeleft < 0){
            clearInterval(timeInterval);
            clearPage();
            printScorePage();
        }
    }, 1000);
};

//This start quiz function will contain the main calls that write the questions to the screen
function startQuiz(quiz){
    //initilize the timer
    clearPage();
    var timer = setCountdown(quiz);
    count(timer);

    //if this isn't the first quiz in a session, it will show timer and line again
    $(".feedback-line").show();
    $(".timer").show();
    
    //print the current question to the screen
    printQuestion(quiz[currentQuestion], quiz);
}

//printing function that prints the current function to the screen
function printQuestion(question, quiz){
    //storing some variables from the html to change
    //storing important data from the questions object to be used
    var questionBox = $(".question-text");
    var answers = question.choices;

    //changing the text in the boxes needed
    //adding buttons/answer choices to boxes needed
    questionBox.text(question.title);
    createAnswers(answers, quiz);
}

//create answers function creates a number of buttons matching the number of answer choices
//pass the answers array into this function for it to work correctly
function createAnswers(answers, quiz){
    //the button group containing the answers
    var buttonGroup = $(".answers");

    for(i=0; i<answers.length;i++){
        var choice = $("<button>");
        choice.addClass("answer-choice btn-info text-left");
        
        //the choice attributed to the button
        choice.attr("data-answer", i);
        choice.text((i+1) + ". " + answers[i]);
        buttonGroup.append(choice);
    }

    $(".answer-choice").on("click", function(){
        console.log("answer clicked");
    
        //clear page for next question
        clearPage();

        //check the answer to the correct one stored in the object
        checkAnswer($(this).attr("data-answer"), quiz[currentQuestion].answer);
    
        //move to the next question if there is a next question, otherwise end the quiz
        if(currentQuestion < quiz.length - 1){
            //increment the question number
            currentQuestion++;

            //console.log(quiz.length);
            //console.log(currentQuestion);
            printQuestion(quiz[currentQuestion], quiz);
        }
        else{
            clearPage();
            //Final score calculation
            score += timeLeft;

            //print the score page
            printScorePage();

            //hides the line in the middle of the quiz
            $(".feedback-line").hide();
            $(".timer").hide();
        }
    });
}

//function that will create a new div on the highscores page for each player
//displaying their name and score
function createHighScores(){
    var playersBox = $(".players");
    var clearButton = $(".clear-button");

    for(i=0;i<highScoreNames.length;i++){
        var player = $("<div>");
        player.addClass("highscore-player");
        player.text(highScoreNames[i] + ": " + highScoreScores[i]);
        playersBox.append(player);
    }

    clearButton.on("click", function(event){
        event.preventDefault();
        playersBox.empty();
        localStorage.clear();
    });
}

//function that will check the user answer and see if it is stored in the same index as the correct answer number
function checkAnswer(click, answer){
    feedback = $(".feedback");
    //console.log(click);
    //console.log(answer);
    if(click === answer){
        feedback.text("That answer was correct.");
        score += 10;
    }
    else{
        feedback.text("That answer was not correct.");
        timeLeft -= 15;
    }
}

//clear page function should be used between questions to delete the question and answer choices
function clearPage(){
    $(".answers").empty();
    $(".question-text").empty();
    $(".feedback").empty();
}

//Function to be called at the end to display the final score
function printScorePage(){
    //variables to point to the top and bottom box on the jumbotron
    var topBox = $(".question-text");
    //var bottomBox = $(".feedback-box");
    $(".user-score").removeAttr("hidden");

    //variables that will handle storing the username and score
    var userName = $(".username");
    var submitScore = $(".submit");

    //now the click event handler
    submitScore.on("click", function(event){
        event.preventDefault();

        highScoreNames.push(userName.val());
        highScoreScores.push(score);

        if(highScoreScores.length>1){
            sortScores();
        }
        localStorage.setItem("highScoreNames", JSON.stringify(highScoreNames));
        localStorage.setItem("highScoreScores", JSON.stringify(highScoreScores));
    });

    topBox.text("Your final score is: " + score);
    //bottomBox.text(score);
}

//Main call to start the quiz
$(".start-button").on("click", function(event){
    event.preventDefault();
    startQuiz(quiz1);
});
//startQuiz(quiz1); 
createHighScores();

//some function calls to test some things
//printQuestion(1);
//count(timer);

//cheap manual clear page function, remember to remove later.
$('.timer').on("click", function(){
    clearPage();
});