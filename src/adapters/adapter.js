const BASE_URL = "http://localhost:3000";

const adapter = {
  getGames: () => {
    return fetch(`${BASE_URL}/games`).then(res => res.json());
  },

  createUser: (username) => {
    const user = {
      username: username
    };
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(user => new User(user.id, user.username))
      .catch((error) => {
        console.log(error.message);
      });
  },

  createGame: (user, score) => {
    const game = {
      user_id: user.id,
      score: score
    };
    return fetch(`${BASE_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(game)
    })
      .then(resp => resp.json())
      .then(game => new Game(game))
      .catch((error) => {
        console.log(error.message);
      });
  }

};
