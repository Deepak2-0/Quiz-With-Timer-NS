function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;

  this.isCorrect = function (choice) {
    return this.answer.toString() === choice;
  };

  this.calculateScore = function (choice, timeTaken) {
    if (!this.isCorrect(choice)) return 0;

    return Math.round((1 / timeTaken) * 100);
  };
}

let timer = 0;

let questions = [
  new Question(
    "For which film did Leonardo DiCaprio got his Oscar?",
    ["Shutter Island", "Titanic", "The Departed", "The Revenant"],
    "The Revenant"
  ),
  new Question(
    "Highest grossing movie of all time?",
    ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars:The Force Awakens"],
    "Avengers: Endgame"
  ),
  new Question(
    "Which is the first feature film made in India in 1913?",
    ["Alam Ara", "Raja Harishchandra", "Kisan Kanya", "Roundhay Garden Scene"],
    "Raja Harishchandra"
  ),
  new Question(
    "Who painted Monalisa?",
    ["Vincent Van Gogh", "Leonardo Da Vinci", "Claude Monet", "Michelangelo"],
    "Leonardo Da Vinci"
  )
];

let currentQuestionIndex = -1;

const handleClick = function (event) {
  let currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.answered === true) {
    return;
  }

  currentQuestion.answered = true;

  if (currentQuestion.isCorrect(event.target.innerHTML)) {
    event.target.className = "correct";
    event.target.classList.add("correct");
  } else {
    event.target.className = "wrong";
    event.target.classList.add("wrong");
  }

  let currentScore = +document.getElementById("score").innerHTML;
  let score = currentQuestion.calculateScore(event.target.innerHTML, timer);
  currentScore += score;

  document.getElementById("score").innerHTML = currentScore;

  setTimeout(() => {
    clearInterval(timerId);
    clearInterval(intervalId);
    if (questions.length - 1 !== currentQuestionIndex) {
      startGame();
    }
  }, 2000);

  if (questions.length - 1 === currentQuestionIndex) {
    setTimeout(() => {
      document.getElementById("timer").innerHTML = "0";
      document.getElementById("gameOver").innerHTML = "Game Over";
    }, 2000);
  }
};

const updateQuestion = function () {
  currentQuestionIndex++;

  let { text, options } = questions[currentQuestionIndex];

  document.getElementById("question").innerHTML = text;

  let optionsEl = document.getElementsByTagName("li");

  for (let i = 0; i < 4; i++) {
    optionsEl[i].innerHTML = options[i];
    optionsEl[i].className = "";
    optionsEl[i].addEventListener("click", handleClick);
  }
};
let timerId;
const startGame = function () {
  timer = 0;

  document.getElementById("timer").innerHTML = 10 - timer;

  timerId = setInterval(() => {
    timer++;

    if (timer === 10) {
      clearInterval(timerId);
      questions[currentQuestionIndex].answered = true;
    }
    document.getElementById("timer").innerHTML = 10 - timer;
  }, 1000);

  updateQuestion();

  if (questions.length - 1 === currentQuestionIndex) {
    clearInterval(intervalId);

    setTimeout(() => {
      document.getElementById("gameOver").innerHTML = "Game Over";
    }, 12000);
  }
};

let intervalId = setInterval(startGame, 12000);

startGame();
