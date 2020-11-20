const BASE_URL = "http://localhost:3000";
const gameContainer = document.getElementById("game-container");
const balloons = document.querySelectorAll(".balloons img");
let score = 1;

document.addEventListener("DOMContentLoaded", () => {
  fetchAndLoadUsers();
  fetchAndLoadGames();
  renderBalloon();
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

function renderBalloon() {
  let balloon = getRandomBalloon();
  gameContainer.append(balloon);

  balloon.addEventListener("click", function (e) {
    if (e.type === "click") {
      updateScore();
      e.target.remove();
    }
  });
}

function updateScore() {
  let scoreCount = document.getElementById("score-count");
  scoreCount.innerHTML = `<p>Score: ${(score++) * 10}</p>`;
}

function getRandomBalloon() {
  for (let i = 0; i < balloons.length; i++) {
    color = balloons[Math.floor(Math.random() * balloons.length)];
  }
  return color;
}

