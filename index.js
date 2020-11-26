const BASE_URL = "http://localhost:3000";
const gameContainer = document.getElementById("game-container");
const colors = ["blue", "green", "orange", "purple", "red", "yellow"];
let scoreCount = document.getElementById("score-count");
let balloons = [];
let balloonDragged;
let balloonReplaced;
let balloonDraggedId;
let balloonReplacedId;
let twoMinutes = 60 * 2;
let score = 1;

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

function updateScore() {
  let scoreCount = document.getElementById("score-count");
  scoreCount.innerHTML = `<p>Score: ${(score++) * 10}</p>`;
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
    if (timer < 0) {
      clearInterval(counter);
    }
  }, 1000);
};

function renderBalloons() {
  for (let i = 0; gameContainer.childElementCount < 40; i++) {
    if (gameContainer.childElementCount < 40) {
      balloon = pickRandomBalloon();
      balloon.id = i;
      balloons.push(balloon);
    }
  }

  balloons.forEach(balloon => balloon.addEventListener("dragstart", dragStart));
  balloons.forEach(balloon => balloon.addEventListener("dragover", dragOver));
  balloons.forEach(balloon => balloon.addEventListener("drop", dragDrop));
}

// occurs when the user starts to drag an element
function dragStart() {
  balloonDragged = this.src;
  balloonDraggedId = parseInt(this.id);
}

// occurs when the dragged element is over the drop target
function dragOver(e) {
  e.preventDefault();
}

// occurs when the dragged element is dropped on the drop target
function dragDrop() {
  balloonReplaced = this.src;
  balloonReplacedId = parseInt(this.id);
  validMove();
}

// occurs when the user has finished dragging the element;
// Define valid moves;
function validMove() {
  let validMoves = [
    balloonDraggedId - 1,
    balloonDraggedId - 10,
    balloonDraggedId + 1,
    balloonDraggedId + 10
  ];
  let validMove = validMoves.includes(balloonReplacedId);

  if (balloonReplacedId && validMove) {
    balloons[balloonReplacedId].src = balloonDragged;
    balloons[balloonDraggedId].src = balloonReplaced;
  } else if (balloonReplacedId && !validMove) {
    balloons[balloonReplacedId].src = balloonReplaced;
    balloons[balloonDraggedId].src = balloonDragged;
  } else {
    balloons[balloonDraggedId].src = balloonDragged;
  }
}

