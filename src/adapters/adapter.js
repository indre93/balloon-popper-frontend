const BASE_URL = "http://localhost:3000";

const adapter = {

  getGames: () => {
    return fetch(`${BASE_URL}/games`).then(res => res.json());
  },

  createUser: (username) => {
    const user = { username: username };
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    })
      .then(resp => resp.json());
  },

  createGame: (value) => {
    const game = {
      username: value
    };
    return fetch(`${BASE_URL}/games`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game })
    })
      .then(resp => resp.json());
  }

};