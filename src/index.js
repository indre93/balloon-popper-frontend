const modalTable = document.querySelector(".scoreboard-modal");
const modalEndGame = document.querySelector(".end-game-modal");
const gameTargetGoal = document.querySelector(".game-target-goal");
const balloonTargetGoals = document.querySelector("#balloon-target-goals");
const balloonsContainer = document.querySelector(".balloons-container");
const scoreCount = document.querySelector("#score-count>p>span");
const endGameContainer = document.querySelector(".end-game-container");
const endGameBtn = document.querySelector("button#end-game-btn");
let duration = 60 * 3;
let username;
let score = 0;
let timeUp = false;
let currentUser;

document.addEventListener("DOMContentLoaded", () => {
  welcome();
  startOver();
});

function welcome() {
  const modalForm = document.querySelector(".user-form-modal");
  const gameHeader = document.querySelectorAll("#game-header>.fireworks");
  modalForm.style.display = "block";
  renderHeader(gameHeader);
  renderLogo(gameTargetGoal, 150);
  getCurrentUser(modalForm);
}

function renderHeader(gameHeader) {
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

function getCurrentUser(modalForm) {
  const userForm = document.querySelector(".new-user-form");
  const userInput = document.querySelector("input#username");

  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      modalForm.style.display = "none";
      username = userInput.value;
      startNewGame();
    }
  });
}

function startNewGame() {
  const playerName = document.querySelector("#main-header");
  balloonsContainer.style.display = "grid";
  gameTargetGoal.firstElementChild.remove();
  playerName.innerHTML = `<h1>Hi! ${username}</h1>`;
  renderBalloons(balloonImages, 2, false);
  renderGameExpectation();
  startTimer(duration);
  mainLoop();
}

function renderGameExpectation() {
  getBalloonImages(balloonExpectationImgs, 4).forEach(balloon => {
    const arrowImg = document.createElement("img");
    const span = document.createElement("span");
    span.id = balloon.id;
    arrowImg.id = "arrow-img";
    arrowImg.src = "images/arrow.png";
    span.innerHTML = Math.floor(Math.random() * 4) + 5;
    balloonTargetGoals.append(balloon, arrowImg, span);
  });
}

function updateGameTarget(balloon) {
  const array = Array.from(balloonTargetGoals.getElementsByTagName("span"));
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
  const countdown = document.querySelector("#timer");
  let timer = duration, minutes, seconds;
  let counter = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdown.innerHTML = `<p>${minutes}:${seconds}</p>`;
    --timer;
    if (timer < 20) {
      countdown.childNodes[0].className = "blink";
    }
    if (timer < 0) {
      clearInterval(counter);
      timeUp = true;
      countdown.childNodes[0].className = "";
    }
  }, 1000);
};

function mainLoop() {
  const array = Array.from(balloonTargetGoals.getElementsByTagName("img"));
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
  currentUser = user;
  const games = new Games();
  return games;
}

function highlightCurrentUser() {
  const trows = Array.from(document.getElementsByTagName("tr"));
  const row = trows.find(row => Number(row.dataset.userId) === currentUser.id);
  row.style.backgroundColor = "rgba(31, 50, 59, 0.429)";
  row.style.borderRadius = "0px";
}

function wonGame() {
  addUserAndGameData();
  const endGameBalloons = document.querySelectorAll(".end-game-modal>.balloons-img");
  balloonsContainer.style.display = "none";
  modalEndGame.style.display = "grid";
  endGameBalloons.forEach(div => renderLogo(div, -190));
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  h1.innerHTML = "You Win!";
  p.innerHTML = "Final Score:";
  endGameContainer.prepend(h1, p);
  document.querySelector("#final-score").innerHTML = score;

  gameHeader.forEach(div => {
    div.className += " animate";
  });

  endGameBtn.innerHTML = "<p>See Scoreboard</p>";
  endGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.type === "click") {
      modalEndGame.style.display = "none";
      modalTable.style.display = "grid";
      highlightCurrentUser();
    }
  });
}

function startOver() {
  const startOverBtn = document.querySelector("button#start-over-btn");
  startOverBtn.addEventListener("click", (e) => {
    if (e.type === "click") {
      game = "";
      balloonsContainer.innerHTML = "";
      balloonTargetGoals.innerHTML = "";
      username = "";
      playerName.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
      scoreCount.innerHTML = "<p>0</p>";
      countdown.innerHTML = "<span>00:00</span>";
      renderWelcome();
    }
  });
}

function gameOver() {
  balloonsContainer.style.display = "none";
  modalEndGame.style.display = "grid";
  modalEndGame.style.gridTemplateColumns = "150px auto 150px";
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  h1.innerHTML = "Sorry...you lost";
  h2.innerHTML = "you were so close!";
  endGameContainer.prepend(h1, h2);

  endGameBtn.innerHTML = "<p>Try Again</p>";
  endGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.type === "click") {

      console.log(e.type);
    }
  });
}
