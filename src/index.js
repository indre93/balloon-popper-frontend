const modalForm = document.querySelector("#game-container > .user-form-modal");
const modalTable = document.querySelector("#game-container > .scoreboard-modal");
const balloonContainer = document.querySelector("#game-container > .balloons-container");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const startOverBtn = document.querySelector("button#start-over-button");

let games = new Games();
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
  let game = new Game(
    id = undefined,
    username = username,
    score = score
  );
  game.start();
  renderGameHeader();
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

function updateScoreBy(amount) {
  const scoreCount = document.querySelector("#score-count");
  scoreCount.innerHTML = `<p>Score: ${(score += amount)}</p>`;
}

function SoundEffect() {
  let popSound = new Audio("sounds/pop.mp3");
  return popSound.play();
}

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
