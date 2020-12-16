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
const balloonTargetNum = balloonExpectations.getElementsByTagName("span");
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
  // renderWelcome();
  startNewGame();
});

function renderWelcome() {
  balloonsContainer.style.display = "none";
  modalTable.style.display = "none";
  modalForm.style.display = "block";
  renderHeader();
  renderLogo(gameExpectation, 150);
  getUsername();
}

function renderHeader() {
  playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
  gameHeader.forEach(div => {
    const img = document.createElement("img");
    img.src = "images/fireworks.png";
    div.append(img);
  });
}

function renderLogo(container, endingPos) {
  const balloonsImg = document.createElement("img");
  balloonsImg.src = "images/balloons-logo.png";
  balloonsImg.id = "balloons";
  container.prepend(balloonsImg);
  movingLogo(balloonsImg, endingPos);
}

function movingLogo(img, endingPos) {
  let pos = 500;
  let id = setInterval(frame, 20);
  function frame() {
    if (pos == endingPos) {
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
  mainLoop();
}

function mainLoop() {
  if (!timeUp) {
    game.checkForMatchingBalloons();
    requestAnimationFrame(mainLoop);
  }
}

function renderGameHeader() {
  currentLevel.innerHTML = "<h2>Level 1</h2>";
  playerName.innerHTML = `<h1>Hi!, ${username}</h1>`;
  gameLives.innerHTML = "<h2>Life: 3</h2>";
  gameHeader.append(currentLevel, playerName, gameLives);
}

function renderGameExpectation() {
  getBalloonImages(balloonExpectationImgs, 4).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    span.id = balloon.id;
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 5) + 5;
    balloonExpectations.append(balloon, arrowImg, span);
  });
}

function updateGameTarget(balloon) {
  const array = Array.from(balloonTargetNum);
  const targetElem = array.find(elem => elem.id === balloon.id);
  const checkImg = document.createElement("img");
  checkImg.src = "images/check.png";

  setTimeout(() => {
    if (typeof targetElem !== "undefined") {
      if (0 < targetElem.innerHTML) {
        targetElem.innerHTML -= 1;
        if (targetElem.innerHTML <= 0) targetElem.replaceWith(checkImg);
      }
    }
  }, 0);
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
      // gameOver();
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
