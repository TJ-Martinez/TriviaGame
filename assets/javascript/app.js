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
   question: "Which head coach had the best win/lose ratios in entirety of the NBA",
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
