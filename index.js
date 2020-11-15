const BASE_URL = 'http://localhost:3000';
const usersArray = [];
const gamesArray = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchAndLoadUsers();
  fetchAndLoadGames();
});

function fetchAndLoadUsers() {
  fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(users => {
      for (let user of users) {
        let newUser = new User(user.id, user.username);
        usersArray.push(newUser);
        newUser.renderUser();
      }
    });
}

function fetchAndLoadGames() {
  fetch(`${BASE_URL}/games`)
    .then(response => response.json())
    .then(games => {
      for (let game of games) {
        let newGame = new Game(game.id, game.user.username, game.score);
        gamesArray.push(newGame);
        newGame.renderGame();
      }
    });
}


