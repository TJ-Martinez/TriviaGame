//.append or .html variables. and button variable 
var btnStart = $("<button>").attr({"class":"btn btn-default"});
var questionDiv = $("<h2>");
var answerDiv = $("<p>")
//Time Variables
var initialTimer = 24;
var timer;
var time;
var totalTime = 0;
var recordTime = 0;
var timerActive = false;
var intervalId;
//for, if, else, conditional and scoreboard variables
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


