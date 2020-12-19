const balloonTargetGoals = document.querySelector("#balloon-target-goals");
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
  display.welcomeView();
  getCurrentUser();
}

function getCurrentUser() {
  const userForm = document.querySelector(".new-user-form");
  const userInput = document.querySelector("input#username");
  userForm.addEventListener("submit", (e) => {
    if (e.type === "submit") {
      e.preventDefault();
      username = userInput.value;
      startNewGame();
    }
  });
}

function startNewGame() {
  display.gameView();
  startTimer(duration);
  mainLoop();
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
  } else {
    gameOver();
  }
}

async function addUserAndGameData() {
  const user = await adapter.createUser(username);
  await adapter.createGame(user, score);
  currentUser = user;
  new Games();
}

function highlightCurrentUser() {
  const trows = Array.from(document.getElementsByTagName("tr"));
  const row = trows.find(row => Number(row.dataset.userId) === currentUser.id);
  row.style.backgroundColor = "rgba(31, 50, 59, 0.429)";
  row.style.borderRadius = "0px";
}

function wonGame() {
  addUserAndGameData();
  display.endGameView();
  document.getElementById("end-game-btn").addEventListener("click", (e) => {
    if (e.type === "click") {
      e.preventDefault();
      display.scoreboardView();
      highlightCurrentUser();
    }
  });
}

function gameOver() {
  display.endGameView();
  document.getElementById("end-game-btn").addEventListener("click", (e) => {
    if (e.type === "click") {
      e.preventDefault();
      location.reload();
    }
  });
}

function startOver() {
  document.getElementById("start-over-btn").addEventListener("click", (e) => {
    if (e.type === "click") {
      e.preventDefault();
      location.reload();
    }
  });
}
