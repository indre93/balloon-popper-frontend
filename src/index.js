const modalForm = document.querySelector(".user-form-modal");
const modalTable = document.querySelector(".scoreboard-modal");
const modalEndGame = document.querySelector(".end-game-modal");
const userForm = document.querySelector(".new-user-form");
const userInput = document.querySelector("input#username");
const gameHeader = document.querySelectorAll("#game-header>.fireworks");
const playerName = document.querySelector("#player-name");
const gameExpectation = document.querySelector(".game-expectation");
const balloonExpectations = document.querySelector("#balloon-expectations");
const balloonsContainer = document.querySelector(".balloons-container");
const countdown = document.querySelector("#timer");
const scoreCount = document.querySelector("#score-count>p>span");
const startOverBtn = document.querySelector("button#start-over-btn");
const endGameBalloons = document.querySelectorAll(".end-game-modal>.balloons-img");
const finalScore = document.querySelector("#final-score");
const scoreBoardBtn = document.querySelector("button#see-scoreboard-btn");
const popSound = new Audio("sounds/pop.mp3");
let duration = 60 * 2;
let username;
let score = 0;
let timeUp = false;

document.addEventListener("DOMContentLoaded", () => {
  renderWelcome();
});

function renderWelcome() {
  balloonsContainer.style.display = "none";
  modalTable.style.display = "none";
  modalForm.style.display = "block";
  renderHeader();
  renderLogo(gameExpectation, 150);
  getCurrentUser();
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
  let id = setInterval(frame, 10);
  function frame() {
    if (pos == endingPos) {
      clearInterval(id);
    } else {
      pos--;
      img.style.top = pos + "px";
    }
  }
}

function getCurrentUser() {
  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      username = userInput.value;
      startNewGame();
    }
  });
}

function startNewGame() {
  modalForm.style.display = "none";
  balloonsContainer.style.display = "grid";
  gameExpectation.firstElementChild.remove();
  playerName.innerHTML = `<h1>Hi! ${username}</h1>`;
  renderBalloons(balloonImages, 2, false);
  renderGameExpectation();
  startTimer(duration);
  mainLoop();
}

function mainLoop() {
  const array = Array.from(balloonExpectations.getElementsByTagName("img"));
  const checkMarks = array.filter(elem => elem.id === "checkMark");

  if (!timeUp && checkMarks.length != 6) {
    checkForMatchingBalloons();
    requestAnimationFrame(mainLoop);
  } else {
    cancelAnimationFrame(mainLoop);
    endGame(checkMarks);
  }
}

function endGame(checkMarks) {
  if (!timeUp && checkMarks.length === 6) {
    wonGame();
  } else if (timeUp) {
    gameOver();
  } else {
    startOver();
  }
}

async function addUserAndGameData() {
  const user = await adapter.createUser(username);
  await adapter.createGame(user, score);
  const allGames = new Games();
  return allGames;
}

function renderGameExpectation() {
  getBalloonImages(balloonExpectationImgs, 4).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    span.id = balloon.id;
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 4) + 5;
    balloonExpectations.append(balloon, arrowImg, span);
  });
}

function updateGameTarget(balloon) {
  const array = Array.from(balloonExpectations.getElementsByTagName("span"));
  const targetElem = array.find(elem => elem.id === balloon.id);
  const checkImg = document.createElement("img");
  checkImg.src = "images/check.png";
  checkImg.id = "checkMark";

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
    if (timer < 20) {
      countdown.childNodes[0].style.color = "orangered";
    }
    if (timer < 0) {
      clearInterval(counter);
      gameOver();
    }
  }, 1000);
};

function wonGame() {
  addUserAndGameData();
  endGameBalloons.forEach(div => renderLogo(div, -190));
  balloonsContainer.style.display = "none";
  modalEndGame.style.display = "grid";
  finalScore.innerHTML = score;
  gameHeader.forEach(div => {
    div.className += " animate";
  });

  scoreBoardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.type === "click") {
      modalEndGame.style.display = "none";
      modalTable.style.display = "grid";
    }
  });
}

function startOver() {
  startOverBtn.addEventListener("click", (e) => {
    if (e.type === "click") {
      game = "";
      balloonsContainer.innerHTML = "";
      balloonExpectations.innerHTML = "";
      username = "";
      playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
      scoreCount.innerHTML = "<p>0</p>";
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
