const modalForm = document.querySelector("#game-container > .user-form-modal");
const modalTable = document.querySelector("#game-container > .scoreboard-modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const balloonContainer = document.querySelector("#game-container > .balloons-container");
const scoreCount = document.querySelector(".current-game-info > #score-count");
const startOverBtn = document.querySelector("button#start-over-button");
let games = new Games();
let game = new Game();
let username;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  getUsername();
  // startNewGame();
});

function getUsername() {
  modalForm.style.display = "block";
  balloonContainer.style.display = "none";

  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      modalForm.style.display = "none";
      balloonContainer.style.display = "grid";
      username = userInput.value;
      // adapter.createUser(username);
      startNewGame();
    }
  });
}

function startNewGame() {
  renderBalloons(balloonImages, 2, false);
  game.start();
  renderGameHeader();
  renderGameExpectation();
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

function renderGameHeader() {
  const gameHeader = document.querySelector(".header-class > #game-header");
  const currentLevelDiv = document.querySelector("#game-header > #current-level");
  const playerName = document.querySelector("#game-header > #player-name");
  const gameLives = document.querySelector("#game-header > #game-lives");

  currentLevelDiv.innerHTML = "<h2>Level 1</h2>";
  playerName.innerHTML = `<h1>Hi!, ${username}</h1>`;
  gameLives.innerHTML = "<h2>Lives: 3</h2>";
  gameHeader.append(currentLevelDiv, playerName, gameLives);
}

function renderGameExpectation() {
  const divExpectation = document.getElementById("balloon-expectations");
  getBalloonImages(balloonExpectationImgs, 4, null).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 10) + 3;
    divExpectation.append(balloon, arrowImg, span);
  });
}

function SoundEffect() {
  const popSound = new Audio("sounds/pop.mp3");
  return popSound.play();
}
