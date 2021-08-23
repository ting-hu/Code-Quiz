var questionsArry = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    title: "Arrays in JavaScript can be used to store ___.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    title: "The condition in an if/else statement is enclosed within ___.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parantheses",
      "4. square brackets",
    ],
    answer: "3. parantheses",
  },
  {
    title:
      "String values must be enclosed within ___ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loop",
      "4. console.log()",
    ],
    answer: "4. console.log()",
  },
];
var currentTime = document.querySelector("#countdown");
var timer = document.querySelector("#start-time");
var questions = document.querySelector("#question");
var pageContent = document.querySelector("#page-content");
var ulCreate = document.createElement("ul");
var counter = 0;
var score = 0;
var timeLeft = 75;
var timePenalty = 10;
var timeInterval;

var countDown = function () {
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      currentTime.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft <= 0) {
      clearInterval(timeInterval);
      allDone();
      currentTime.textContent = 0;
    }
  }, 1000);

  displayQuestion(counter);
};

var displayQuestion = function (counter) {
  questions.innerHTML = "";
  ulCreate.innerHTML = "";
  for (let i = 0; i < questionsArry.length; i++) {
    questions.innerHTML = questionsArry[counter].title;
    var userChoices = questionsArry[counter].choices;
    questions.setAttribute("style", "font-weight:bold; font-size:20px");
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questions.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
};

var compare = function (event) {
  var element = event.target;

  if (element.matches("li")) {
    var divisor = document.createElement("div");
    divisor.setAttribute("class", "divisor");
    if (element.textContent === questionsArry[counter].answer) {
      divisor.textContent = "Correct!";
    } else {
      timeLeft = timeLeft - 10;
      divisor.textContent = "Wrong!";
    }
    counter++;

    if (counter >= questionsArry.length) {
      allDone();
      divisor.removeProperty();
      if (timeLeft <= 0) {
        currentTime.textContent = 0;
      }
    } else {
      displayQuestion(counter);
    }
  }
  questions.appendChild(divisor);
};

var allDone = function () {
  clearInterval(timeInterval);
  if (timeLeft <= 0) {
    currentTime.textContent = 0;
  }

  questions.innerHTML = "";
  ulCreate.innerHTML = "";

  var headerEl = document.createElement("h1");
  headerEl.setAttribute("class", "all-done-header");
  headerEl.textContent = "All Done!";
  questions.appendChild(headerEl);

  var paragraghEl = document.createElement("p");
  paragraghEl.setAttribute("class", "all-done-p");
  if (timeLeft >= 0) {
    paragraghEl.textContent = "Your final score is " + timeLeft;
    score = timeLeft;
    questions.appendChild(paragraghEl);
  } else {
    paragraghEl.textContent = "Your final score is 0";
    score = 0;
    questions.appendChild(paragraghEl);
  }

  var labelEl = document.createElement("label");
  labelEl.setAttribute("class", "all-done-l");
  labelEl.textContent = "Enter initials: ";
  questions.appendChild(labelEl);

  var inputEl = document.createElement("input");
  inputEl.setAttribute("class", "all-done-input");
  inputEl.setAttribute("type", "text");
  questions.appendChild(inputEl);

  var submitEl = document.createElement("button");
  submitEl.setAttribute("class", "all-done-button");
  submitEl.textContent = "Submit";
  questions.appendChild(submitEl);

  submitEl.addEventListener("click", function () {
    var initials = inputEl.value;

    if (initials === null) {
    } else {
      var finalScore = { initials: initials, score: score };
      var temp = localStorage.getItem("local");
      if (temp === null) {
        temp = [];
      } else {
        temp = JSON.parse(temp);
      }

      temp.push(finalScore);

      var record = JSON.stringify(temp);
      localStorage.setItem("local", record);

      window.location.replace("./highScore.html");
    }
  });
};

timer.addEventListener("click", countDown);
