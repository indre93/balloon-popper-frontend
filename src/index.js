const modalForm = document.querySelector(".user-form-modal");
const modalTable = document.querySelector(".scoreboard-modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const gameHeader = document.querySelector("#game-header");
const currentLevel = document.querySelector("#current-level");
const playerName = document.querySelector("#player-name");
const gameLives = document.querySelector("#game-lives");
const gameExpectation = document.querySelector(".game-expectation");
const balloonExpectations = document.querySelector("#balloon-expectations");
const balloonsContainer = document.querySelector(".balloons-container");
const countdown = document.querySelector("#timer");
const scoreCount = document.querySelector("#score-count");
const startOverBtn = document.querySelector("button#start-over-button");
const popSound = new Audio("sounds/pop.mp3");
let games = new Games();
let game = new Game();
let duration = 60 * 2;
let username;
let score = 0;
let timeUp = false;

document.addEventListener("DOMContentLoaded", () => {
  renderWelcome();
});

function renderWelcome() {
  renderLogo();
  playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
  modalForm.style.display = "block";
  balloonsContainer.style.display = "none";
  getUsername();
}

function renderLogo() {
  const logo = document.createElement("img");
  logo.src = "images/balloons-logo.png";
  logo.id = "logo";
  gameExpectation.prepend(logo);
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
      balloonsContainer.style.display = "grid";
      gameExpectation.firstElementChild.remove();
      username = userInput.value;
      // adapter.createUser(username);
      startNewGame();
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
  currentLevel.innerHTML = "<h2>Level 1</h2>";
  playerName.innerHTML = `<h1>Hi!, ${username}</h1>`;
  gameLives.innerHTML = "<h2>Lives: 3</h2>";
  gameHeader.append(currentLevel, playerName, gameLives);
}

function renderGameExpectation() {
  getBalloonImages(balloonExpectationImgs, 4, null).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 10) + 3;
    balloonExpectations.append(balloon, arrowImg, span);
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
    if (timer < 0) {
      clearInterval(counter);
      gameOver();
    }
  }, 1000);
};

function startOver() {
  startOverBtn.addEventListener("click", (e) => {
    if (e.type === "click") {
      game = "";
      currentLevel.innerHTML = "";
      gameLives.innerHTML = "";
      balloonsContainer.innerHTML = "";
      balloonExpectations.innerHTML = "";
      username = "";
      playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
      scoreCount.innerHTML = "<p>Score: 0</p>";
      countdown.innerHTML = "<span>00:00</span>";
      renderWelcome();
    }
  });
}

function gameOver() {
  timeUp = true;
  balloonsContainer.style.display = "none";
  modalTable.style.display = "block";
}
