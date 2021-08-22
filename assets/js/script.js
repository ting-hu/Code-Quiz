var questionsArry = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    title: "Array in JavaScript can be used to store ___.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all fo the above",
    ],
    answer: "4. all of the above",
  },
];
var currentTime = document.querySelector("#countdown");
var timer = document.querySelector("#start-time");
var questions = document.querySelector("#question");
var pageContent = document.querySelector("#page-content");
var ulCreate = document.createElement("ul");
var counter = 0;

var countDown = function () {
  var timeLeft = 6;

  var timeInterval = setInterval(function () {
    currentTime.textContent = timeLeft;
    if (timeLeft < 0) {
      clearInterval(timeInterval);
      currentTime.textContent = "";
      currentTime.textContent = 0;
    }
    timeLeft--;
    displayQuestion(counter);
  }, 1000);
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
    if (element.textContent == questionsArry[counter].answer) {
      divisor.textContent = "Correct";
    } else {
      //Time penatly
      divisor.textContent = "Wrong";
    }
    counter++;

    if (counter === questionsArry.length) {
      divisor.textContent = "End of quiz";
    }

    questions.appendChild(divisor);
  }
};

timer.addEventListener("click", countDown);
