//.append or .html variables. and button variable when i need to add in some html to js. 
var btnStart = $("<button>").attr({"class":"btn btn-default"});
var questionDiv = $("<h2>");
var answerDiv = $("<p>")
//Time Variables: need starting time, record time, stopper, and a countdown. 
var initialTimer = 24;
var timer;
var time;
var totalTime = 0;
var recordTime = 0;
var timerActive = false;
var intervalId;
//for, if, else, conditional and scoreboard variables and user interaction variables. 
var wins = 0;
var losses = 0;
var ties = 0;
var correctCount = 0;
var incorrectCount = 0;
var qCount = 0;
var correctAnswer;
var userAnswer;
var activeGame = false;
var scoreboardSwitcher = true;
var gameCount = 0;


// Q & A array
var actualquestion = [{
    question: "With what team did Kareem-Abdul-jabbar start his NBA career?",
    options: ["Milwaukee-Bucks", "L.A. Lakers", "", "Houston Rockets", "New York Knicks"],
    answer: 'Milwaukee-Bucks',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus: ''
},

{
    question: "Who has the high PPG(Points Per Game) Avg ever in the history of the NBA?",
    options: ["Wilt Chamberlain", "Larry Bird", "Lebron James", "Michael Jordan", "Kobe Bryant"],
    answer: 'Michael Jordan',
    userAnswer: '',
    correct: false,
    time: 0,
    bonus:''
},
{
   question: "What is a triple-double in Basketball?",
   options: ["Getting double-digits in assist, scoring, and steals", "Getting double-digits in assist, blocks, and steals", "Getting double-digits in rebounds, steals, and blocks", "All the above. You just need double-digits in 3 of the 5 categories"],
   answer: "All the above. You just need double-digits in 3 of the 5 categories",
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: ''
},
{
   question: "Who has the most triple-doubles in the history of the NBA?",
   options: ["Russel Westbrook", "Lebron James", "Magic Johnson", "The Big O (Oscar Robertson)", "None of the Above"],
   answer: 'The Big O (Oscar Robertson)',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: ''
},
{
   question: "Which head coach had the best win/lose ratios in the entirety of the NBA",
   options: ["Phil Jackson", "Gregg Popovich", "Steve Kerr", "Don Nelson", "Pat Riley"],
   answer: 'Phil Jackon',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: ''
},
{
   question: "Which of the following players made the most money off of endorsements?",
   options: ["Kobe Bryant", "Lebron James", "Michael Jordan", "Magic Johnson", "Allen Iverson"],
   answer: 'Michael Jordan',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: 'Air Jordans Bruh!'
},
{
   question: "Of the following players, who has won the most season MVP awards?",
   options: ["Lebron James", "Steve Nash", "Tim Duncan", "Shaquille O'Neal", "Kevin Durant"],
   answer: 'Lebron James',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: ''
},
{
   question: "Which team has the most Championship wins?",
   options: ["Lakers", "Celtics", "Bucks", "Spurs", "Warriors"],
   answer: 'Celtics',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: 'Jeez 17 Wins!'
},
{
   question: "Which team has the most international players?",
   options: ["Raptors", "Spurs", "Mavericks", "Jazz", "Knicks", "Heat"],
   answer: 'Raptors',
   userAnswer: '',
   correct: false,
   time: 0,
   bonus: ''
}]

window.onload = function() {
    // load initial timer
    var convertedTimer = convertTime(initialTimer)
    $("#timer").html(convertedTimer)

    // load initial score
    updateScoreboard();

    // load start button and initial message
    btnStart.text("Start Game");
    
    answerDiv.html("<p>Challenge</p>" 
    + "<p>Also, click the scoreboard to toggle its display between the current game score and overall record</p>")
   .attr({"class":"msg"});
    $("#content").append(btnStart, answerDiv);

    // click events for start button, timer, and scoreboard
    btnStart.on("click", function(){
        startGame();
    })

    $("#timer").on("click", function(){
        adjustTimer();
    })

    $("#scoreboard-title").on("click", function(){
        if(!activeGame){
            if(scoreboardSwitcher){
                scoreboardSwitcher = false;
            } else {
                scoreboardSwitcher = true;
            }
        updateScoreboard();
        }
    })
}
// adjusts timer on click at start and end screens
function adjustTimer(){
    if(!activeGame && scoreboardSwitcher){
        if(initialTimer > 0){
            initialTimer -= 5;
        } else {
            initialTimer = 24;
        }  
        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
    } 
}



// starts the game
function startGame(){
    activeGame = true;
    
    //shuffle questions
    actualquestion = shuffle(actualquestion)
    
    //display question
   nextQuestion()
}



// loads the next question
function nextQuestion(){
    // start the timer
    startTimer(initialTimer);

    // Shuffle options, clear answerDiv
    var shuffledOptions = shuffle(actualquestion[qCount].options);
    answerDiv.text("")
    // Save correct answer to global for easier access
    correctAnswer = actualquestion[qCount].answer;

    // Populate question content
    questionDiv.text( actualquestion[qCount].question);
    $("#content").html(questionDiv);
    $("#title").html("Question " + (qCount + 1) + " of " + actualquestion.length);

    // create a button for each option
    for(var i = 0; i < shuffledOptions.length; i++){
        $("<button>")
        .attr({"class": "btn btn-default ansBtn", "value": shuffledOptions[i]})
        .text(shuffledOptions[i])
        .appendTo(answerDiv)
        .click(function(){
            userAnswer = this.value;
            actualquestion[qCount].userAnswer = userAnswer;
            showResult(userAnswer)
        }); 
    };
    
    // populate answer buttons
    $("#content").append(answerDiv); 
};
  


  // shuffles and returns shuffled array  
function shuffle(array){
    for(i = 0; i < array.length; i++){
        var j = Math.floor(Math.random() * array.length)
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array; 
}



// processes userAnswer and displays the result for 3 seconds
function showResult(userAnswer){
    var message;

    // active timer means an answer was clicked, so process answer
    if(timerActive){
        // stop that timer
        stopTimer();

        // result for a correct answer
        if(userAnswer == correctAnswer){
            questionDiv.text("Correct!");
            message = "Point for the HOME Team! " + userAnswer + " is the correct answer!";
            correctCount++;
            actualquestion[qCount].correct = true;
        
        //result for an incorrect answer
        } else {
            questionDiv.text("Wrong!");
            message = "Point for the AWAY TEAM. You answered: " + userAnswer + "<br>" + "Correct Answer: " + correctAnswer;
            incorrectCount++;
        }

    // function was called when timer hit 0
    } else {
        questionDiv.text("Time's Up!");
        message = "The Correct Answer was " + correctAnswer;
        incorrectCount++;
    }

    //update the time in the object and update totalTime
    if(typeof time != 'number'){
        time = 0;
    }
    actualquestion[qCount].time = time;
    totalTime += time;

    // display the results
    $("#content").html(questionDiv);
    $(answerDiv).html(message).appendTo("#content");
    qCount++
    updateScoreboard();

    // If there are questions left, go the next one; 
    //otherwise, go to the end screen
    if(activeGame){
    setTimeout(nextQuestion, 2400)
    } else {
        setTimeout(gameOver, 2400)
    }
}



// starts the timer
function startTimer(startValue){
    if(!timerActive){
        timer = startValue;
        intervalId = setInterval(timerCountdown, 1000)
        timerActive = true;
    }
}


// stops the timer and resets it to 0
function stopTimer(){
    clearInterval(intervalId);
    timerActive = false;
    $("#timer").html("00:00");
}


// decrements the timer and stops it at 0
function timerCountdown(){
        timer--

        // converts the timer format to look cool
        var convertedTimer = convertTime(timer)
        $("#timer").html(convertedTimer)
        
        // calc elapsed time for question
        time = initialTimer - timer

        // stop it at 0 and go to result screen
        if(timer === 0){
            stopTimer();
            userAnswer = "";
            showResult(userAnswer)
        }
        
}


// converts time to look good on a scoreboard
function convertTime(t){
    if(t < 10){
        t = "00:0" + t
    } else {
        t = "00:" + t
    }
    return t;
}



// updates the scoreboard and stops the game when there are no more questions
function updateScoreboard(){
    
    if(scoreboardSwitcher){
        // display current score/time
        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
        $("#scoreboard-lbl-left").html("HOME");
        $("#scoreboard-lbl-center").html("CLOCK");
        $("#scoreboard-lbl-right").html("AWAY");
        // format scores
        if(correctCount > 9){
            $("#scoreboard-left").html(correctCount);
        } else {
            $("#scoreboard-left").html("0" + correctCount);
        }

        if(incorrectCount > 9){
            $("#scoreboard-right").html(incorrectCount);
        } else {
            $("#scoreboard-right").html("0" + incorrectCount);
        }
        // displays total wins/losses and best avg time
    } else {
        var convertedRecord = convertTime(recordTime)
        $("#scoreboard-lbl-left").html("WINS");
        $("#scoreboard-lbl-center").html("BEST");
        $("#scoreboard-lbl-right").html("LOSSES");
        $("#scoreboard-left").html(wins)
        $("#timer").html(convertedRecord)
        $("#scoreboard-right").html(losses)
    }
    // stops the game if this was the last question
    if(qCount === actualquestion.length){
        activeGame = false;
    }
}


// processes all results and displays them, plus adds a restart game button
function gameOver(){
    var message;
    var restartMessage = "<p>Don't forget to click the timer if you want to make next round harder or easier!</p>" +
    "<p>Also, click the scoreboard labels to see your overall record!"
    var percent = (Math.round((correctCount/qCount) * 100)) + "%"
    var avgTime = totalTime / qCount

    $("#title").html("Game Over")
    questionDiv.html("Grade: " + percent);
    answerDiv.html("<p><strong>You answered " + correctCount + " out of " + qCount + " questions correctly<br>" +
                    "Average Time per Question: " + avgTime + " second(s)</strong></p><br>")

    
    //compare avg time to record avg
    if(gameCount === 0 || avgTime < recordTime){
        answerDiv.append("<p>New Record Time! Previous record was " + recordTime + " seconds! </p>");
        // TODO: add formatting logic for the scoreboard so the record doesn't have to be rounded
        recordTime = Math.round(avgTime);
    } 


    // add to win or loss totals
    if(correctCount === incorrectCount){
        ties++
    } else if(correctCount > incorrectCount){
        wins++
    } else {
        losses++
    }
    
    //loop through the object array and get the results
    for(i = 0; i < actualquestion.length; i++){
        var result = "<strong>Result: "
        var currentquestion= actualquestion[i]
        // result for correct answers
        if(currentquestion.correct){
            result = result + "Correct!</strong>"

            // go ahead and reset it while we're looping
            currentquestion.correct = false;

        // result for incorrect answers
    } else {
        result = result + "Incorrect</strong>"
    }
        // display the results
        message = "<br>Question " + [i+1] + ": <i>" + currentquestion.question + "</i><br>" +
                "Correct Answer: " + currentquestion.answer + "<br>" +
                "Your Answer: " + currentquestion.userAnswer + "<br>" + 
                "Time: " + currentquestion.time + " seconds <br>" +
                result + "<br>" ;
        answerDiv.append(message);

        // reset it while we're looping
        currentquestion.userAnswer = '';  
        currentquestion.time = 0; 
}
    //display restart button and message
    btnStart.text("Play Again!").attr({"id":"reset"})
    $("#restart").append(btnStart, restartMessage).attr({"class":"msg"})

    // on click, reset the variables
    btnStart.on("click", function(){
        resetVar();
    })  
}


// resets the variables
function resetVar(){
    qCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    totalTime = 0;
    gameCount++;
    scoreboardSwitcher = true;
    $("#restart").html("")
    updateScoreboard();
    startGame();
}