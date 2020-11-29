const BASE_URL = "http://localhost:3000";
const gameContainer = document.getElementById("game-container");
const colors = ["blue", "green", "orange", "purple", "red", "yellow"];
const rowWidth = 10;
let balloonsArray = Array.from(gameContainer.children);
let balloonDragged;
let balloonReplaced;
let balloonDraggedId;
let balloonReplacedId;
let twoMinutes = 60 * 2;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetchAndLoadUsers();
  fetchAndLoadGames();
  renderBalloons();
  startGame();
});

function fetchAndLoadUsers() {
  fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(users => {
      for (let user of users) {
        new User(user.id, user.username);
      }
    });
}

function fetchAndLoadGames() {
  fetch(`${BASE_URL}/games`)
    .then(response => response.json())
    .then(games => {
      for (let game of games) {
        let fetchedGame = new Game(
          game.id,
          game.user.username,
          game.score,
          game.created_at
        );
        fetchedGame.renderTopGames();
      }
    });
}

function getBalloonImages() {
  return colors.map(color => {
    img = document.createElement("img");
    img.src = `images/balloons/${color}.png`;
    return img;
  });
}

function pickRandomBalloon() {
  let balloons = getBalloonImages();
  let randomBalloon = balloons[Math.floor(Math.random() * balloons.length)];
  return randomBalloon;
}

function renderBalloons() {
  for (let i = 0; gameContainer.childElementCount < 40; i++) {
    balloon = pickRandomBalloon();
    gameContainer.append(balloon);
    balloonsArray.push(balloon);
  }

  balloonsArray.forEach((balloon) => {
    balloon.addEventListener("dragstart", dragStart);
    balloon.addEventListener("dragenter", (e) => { e.preventDefault(); });
    balloon.addEventListener("dragover", (e) => { e.preventDefault(); });
    balloon.addEventListener("drop", dragDrop);
  });
}

// occurs when the user starts to drag an element
function dragStart(e) {
  balloonDragged = e.target.src;
  balloonDraggedId = balloonsArray.indexOf(e.target);
}

// occurs when the dragged element is dropped on the drop target
function dragDrop(e) {
  balloonReplaced = e.target.src;
  balloonReplacedId = balloonsArray.indexOf(e.target);
  validMove();
}

function validMove() {
  let validMoves = [
    balloonDraggedId - rowWidth,
    balloonDraggedId - 1,
    balloonDraggedId + 1,
    balloonDraggedId + rowWidth
  ];

  let validMove = validMoves.includes(balloonReplacedId);
  let isBlank = balloonsArray[balloonReplacedId].currentSrc === "";

  if (balloonReplacedId && validMove && !isBlank) {
    balloonsArray[balloonReplacedId].src = balloonDragged;
    balloonsArray[balloonDraggedId].src = balloonReplaced;
  }
  else if (balloonReplacedId && !validMove && !isBlank) {
    balloonsArray[balloonReplacedId].src = balloonReplaced;
    balloonsArray[balloonDraggedId].src = balloonDragged;
  }
  else {
    isBlank;
    balloonsArray[balloonDraggedId].src = balloonDragged;
  }
}

// Move balloons up if they have been cleared
function moveBalloonsUp() {
  for (i = 39; 9 < i; i--) {
    if (balloonsArray[i - rowWidth].currentSrc === "") {
      balloonsArray[i - rowWidth].src = balloonsArray[i].src;
      balloonsArray[i].src = "";
    }
    checkAndFillEmptySpaces();
  }
}

function checkAndFillEmptySpaces() {
  const lastRow = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  const isLastRow = lastRow.includes(i);

  if (isLastRow && (balloonsArray[i].currentSrc === "")) {
    let randomBalloon = balloonsArray[Math.floor(Math.random() * balloonsArray.length)];
    balloonsArray[i].src = randomBalloon.src;
  }
}

function checkForRowMatching() {
  for (i = 0; i < 37; i++) {
    let matchingBalloon = balloonsArray[i].src;
    let possibleRowMatch = [
      [i, i + 1, i + 2, i + 3, i + 4], // 5 mactching
      [i, i + 1, i + 2, i + 3], // 4 matching
      [i, i + 1, i + 2] // 3 matching
    ];

    for (let array of possibleRowMatch) {
      let notValid;
      (array === possibleRowMatch[2]) ? notValid = [8, 9, 18, 19, 28, 29] : (array === possibleRowMatch[1]) ?
        notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29] : notValid = [6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28, 29];

      if (notValid.includes(i)) continue;
      if (array.every(index => balloonsArray[index].src === matchingBalloon)) {
        updateScore();
        array.forEach(index => balloonsArray[index].src = "");
      }
    }
  }
}

function checkForColumnMatching() {
  for (i = 0; i < 20; i++) {
    let matchingBalloon = balloonsArray[i].src;
    let possibleColumnMatch = [i, i + rowWidth, i + rowWidth * 2];

    if (possibleColumnMatch.every(index => balloonsArray[index].src === matchingBalloon)) {
      updateScore();
      possibleColumnMatch.forEach(index => balloonsArray[index].src = "");
    }
  }
}

function startGame() {
  startTimer(twoMinutes);
  setInterval(() => {
    setInterval(() => moveBalloonsUp(), 100);
    checkForRowMatching();
    checkForColumnMatching();
  }, 500);
}

function updateScore() {
  let scoreCount = document.getElementById("score-count");
  let scoreAmount = score = score + 10;
  scoreCount.innerHTML = `<p>Score: ${(scoreAmount)}</p>`;
}

function startTimer(duration) {
  let countdown = document.getElementById("timer");
  let timer = duration, minutes, seconds;
  counter = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdown.innerHTML = `<p>${minutes}:${seconds}</p>`;
    --timer;
    if (timer < 0) clearInterval(counter);
  }, 1000);
};
