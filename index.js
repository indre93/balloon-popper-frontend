const BASE_URL = "http://localhost:3000";
const gameContainer = document.getElementById("game-container");
const balloons = document.querySelectorAll(".balloons img");

document.addEventListener("DOMContentLoaded", () => {
  fetchAndLoadUsers();
  fetchAndLoadGames();
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

function renderBalloons() {
  let balloon = getRandomBalloon();
  gameContainer.append(balloon);
  balloon;
}

function getRandomBalloon() {
  for (let i = 0; i < balloons.length; i++) {
    color = balloons[Math.floor(Math.random() * balloons.length)];
  }
  return color;
}

