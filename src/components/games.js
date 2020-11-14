class Games {
  constructor() {
    this.games = [];
    this.adapter = new GamesAdapter();
    // this.bindEventListeners();
    this.fetchAndLoadGames();
  }

  fetchAndLoadGames() {
    this.adapter.getGames()
      .then(games => {
        games.forEach(game => this.games.push(game));
      })
      .then(() => {
        this.render();
      });
  }

  render() {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = 'My game is here';
  }
}