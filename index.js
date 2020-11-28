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
  startTimer(twoMinutes);
  renderBalloons();
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
  let balloon = balloons[Math.floor(Math.random() * balloons.length)];
  gameContainer.append(balloon);
  return balloon;
}

function renderBalloons() {
  for (let i = 0; gameContainer.childElementCount < 40; i++) {
    balloon = pickRandomBalloon();
    balloon.id = i;
    balloonsArray.push(balloon);
  }

  balloonsArray.forEach((balloon) => {
    balloon.addEventListener("dragstart", dragStart);
    balloon.addEventListener("dragenter", (e) => { e.preventDefault(); });
    balloon.addEventListener("dragover", (e) => { e.preventDefault(); });
    balloon.addEventListener("drop", dragDrop);
  });

  setInterval(() => {
    checkForRowMatching();
    checkForColumnMatching();
  }, 100);
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

  if (balloonReplacedId && validMove) {
    balloonsArray[balloonReplacedId].src = balloonDragged;
    balloonsArray[balloonDraggedId].src = balloonReplaced;
  }
  else if (balloonReplacedId && !validMove) {
    balloonsArray[balloonReplacedId].src = balloonReplaced;
    balloonsArray[balloonDraggedId].src = balloonDragged;
  }
  else balloonsArray[balloonDraggedId].src = balloonDragged;
}

function checkForRowMatching() {
  for (i = 0; i < 37; i++) {
    let matchingBalloon = balloonsArray[i].src;
    let possibleRowMatch = [
      [i, i + 1, i + 2],
      [i, i + 1, i + 2, i + 3],
      [i, i + 1, i + 2, i + 3, i + 4]
    ];

    // Do not check the last two balloons of each row for matching since we need at least three per row
    const notValid = [8, 9, 18, 19, 28, 29];
    if (notValid.includes(i)) continue;

    if (possibleRowMatch[2].every(index => balloonsArray[index].src === matchingBalloon)) {
      possibleRowMatch[2].forEach(index => balloonsArray[index].src = "");
    }
    else if (possibleRowMatch[1].every(index => balloonsArray[index].src === matchingBalloon)) {
      possibleRowMatch[1].forEach(index => balloonsArray[index].src = "");
    }
    else if (possibleRowMatch[0].every(index => balloonsArray[index].src === matchingBalloon)) {
      possibleRowMatch[0].forEach(index => balloonsArray[index].src = "");
    }
  }
}

function checkForColumnMatching() {
  for (i = 0; i < 20; i++) {
    let matchingBalloon = balloonsArray[i].src;
    let possibleColumnMatch = [[i, i + rowWidth, i + rowWidth * 2]];

    if (possibleColumnMatch[0].every(index => balloonsArray[index].src === matchingBalloon)) {
      possibleColumnMatch[0].forEach(index => balloonsArray[index].src = "");
    }
  }
}

function updateScore() {
  let scoreCount = document.getElementById("score-count");
  scoreCount.innerHTML = `<p>Score: ${(score = score + 10)}</p>`;
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
