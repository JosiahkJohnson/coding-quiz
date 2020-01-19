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
        console.log(timeLeft + " seconds left.");
        
        //To end the timer
        if(timeLeft === 0){
            clearInterval(timeInterval);
        }
    }, 1000);
};

var timer = setCountdown(quiz1);
count(timer);