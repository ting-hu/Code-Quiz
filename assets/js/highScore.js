var ulEl = document.querySelector("#highscores");
var clearEl = document.querySelector("#clear-btn");
var goBackEl = document.querySelector("#back-btn");
var scores = localStorage.getItem("local");

clearEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

goBackEl.addEventListener("click", function () {
  window.location.replace("./index.html");
});

var display = function () {
  scores = JSON.parse(scores);

  if (scores != null) {
    for (let i = 0; i < scores.length; i++) {
      var liEl = document.createElement("li");
      liEl.setAttribute("style", "background-color:plum");
      liEl.textContent =
        i + 1 + ". " + scores[i].initials + " - " + scores[i].score;
      ulEl.appendChild(liEl);
    }
  }
};

display();
