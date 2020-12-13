const modalForm = document.querySelector(".user-form-modal");
const modalTable = document.querySelector(".scoreboard-modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const gameHeader = document.querySelector("#game-header");
const currentLevelDiv = document.querySelector("#current-level");
const playerName = document.querySelector("#player-name");
const gameLives = document.querySelector("#game-lives");
const gameExpectationDiv = document.querySelector(".game-expectation");
const balloonExpectationDiv = document.querySelector("#balloon-expectations");
const balloonContainer = document.querySelector(".balloons-container");
const countdown = document.querySelector("#timer");
const scoreCount = document.querySelector("#score-count");
const startOverBtn = document.querySelector("button#start-over-button");
const popSound = new Audio("sounds/pop.mp3");
let games = new Games();
let duration = 60 * 2;
let username;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderWelcome();
});

function renderWelcome() {
  renderLogo();
  playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
  modalForm.style.display = "block";
  balloonContainer.style.display = "none";
  getUsername();
}

function renderLogo() {
  const logo = document.createElement("img");
  logo.src = "images/balloons-logo.png";
  logo.id = "logo";
  gameExpectationDiv.prepend(logo);
  movingLogo(logo);
}

function movingLogo(img) {
  let pos = 500;
  let id = setInterval(frame, 20);
  function frame() {
    if (pos == 150) {
      clearInterval(id);
    } else {
      pos--;
      img.style.top = pos + "px";
    }
  }
}

function getUsername() {
  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      modalForm.style.display = "none";
      balloonContainer.style.display = "grid";
      gameExpectationDiv.firstElementChild.remove();
      username = userInput.value;
      // adapter.createUser(username);
      newGame.start();
    }
  });
}

function startNewGame() {
  game.begin();
  renderGameHeader();
  renderGameExpectation();
  startTimer(duration);
  startOver();
}

function renderGameHeader() {
  currentLevelDiv.innerHTML = "<h2>Level 1</h2>";
  playerName.innerHTML = `<h1>Hi!, ${username}</h1>`;
  gameLives.innerHTML = "<h2>Lives: 3</h2>";
  gameHeader.append(currentLevelDiv, playerName, gameLives);
}

function renderGameExpectation() {
  getBalloonImages(balloonExpectationImgs, 4, null).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 10) + 3;
    balloonExpectationDiv.append(balloon, arrowImg, span);
  });
}

function startTimer(duration) {
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
