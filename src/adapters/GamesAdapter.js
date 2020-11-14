// object w a constructor so whenever we instantiate that adapter it's
// going to set a baseUrl then we'll have the ability to call getGames()
// which will make a fetch request to our baseUrl then we parse the json
class GamesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/games';
  }

  getGames() {
    return fetch(this.baseUrl)
      .then(res => res.json());
  }
}