class Game {
  constructor(id, username, score) {
    this.id = id;
    this.username = username;
    this.score = score;
  }

  renderGame() {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = 'My game is here';
  }
}