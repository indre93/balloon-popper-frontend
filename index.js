const BASE_URL = "http://localhost:3000";
const gameContainer = document.getElementById("game-container");
const colors = ["blue", "green", "orange", "purple", "red", "yellow"];
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
    img.id = `${color}`;
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
  let balloons = [];
  for (let i = 0; gameContainer.childElementCount < 40; i++) {
    if (gameContainer.childElementCount < 40) {
      balloons.push(pickRandomBalloon());
    }
  }

  balloons.forEach(balloon =>
    balloon.addEventListener("click", function (e) {
      if (e.type === "click") {
        e.target.remove();
        updateScore();
        renderBalloons();
      }
    })
  );
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
