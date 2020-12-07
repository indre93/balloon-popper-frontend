const modal = document.querySelector("#game-container > .modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
let games = new Games();
let username;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  getUsername();
});

function getUsername() {
  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      modal.style.display = "none";
      username = userInput.value;
      // adapter.createUser(username);
      startNewGame();
    }
  });
}

function startNewGame() {
  game.start();
  startTimer(60 * 2);
}

function startTimer(duration) {
  let countdown = document.getElementById("timer");
  let timer = duration, minutes, seconds;
  let counter = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdown.innerHTML = `<p>${minutes}:${seconds}</p>`;
    --timer;
    if (timer < 0) clearInterval(counter);
  }, 1000);
};

