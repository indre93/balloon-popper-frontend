const modalForm = document.querySelector("#game-container > .user-form-modal");
const modalTable = document.querySelector("#game-container > .scoreboard-modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const gameHeader = document.querySelector(".header-class > #game-header");
const currentLevelDiv = document.querySelector("#game-header > #current-level");
const playerName = document.querySelector("#game-header > #player-name");
const gameLives = document.querySelector("#game-header > #game-lives");
const gameExpectationDiv = document.querySelector(".game-expectation");
const balloonExpectationDiv = document.querySelector(".game-expectation > #balloon-expectations");
const balloonContainer = document.querySelector("#game-container > .balloons-container");
const scoreCount = document.querySelector(".current-game-info > #score-count");
const startOverBtn = document.querySelector("button#start-over-button");
const popSound = new Audio("sounds/pop.mp3");
let games = new Games();
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
  let pos = 490;
  let id = setInterval(frame, 15);
  function frame() {
    if (pos == -180) {
      clearInterval(id);
      renderLogo();
    } else {
      pos--;
      img.style.top = pos + 'px';
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

let newGame = {
  start: () => {
    let game = new Game();
    renderBalloons(balloonImages, 2, false);
    game.begin();
    renderGameHeader();
    renderGameExpectation();
    startTimer(60 * 2);
    newGame.startOver();
  },
  startOver: () => {
    startOverBtn.addEventListener("click", (e) => {
      if (e.type === "click") {
        username = "";
        score = 0;
        renderWelcome();
      }
    });
  }

};

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
