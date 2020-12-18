class Games {
  constructor() {
    this.games = [];
    this.fetchAndLoadGames();
  }

  fetchAndLoadGames() {
    adapter.getGames()
      .then(games => {
        games.forEach(game => this.games.push(new Game(
          game.id,
          game.user_id,
          game.user.username,
          game.score
        )));
      })
      .then(() => {
        this.sortedByScore().forEach(game => {
          this.renderTopGamesBoard(game);
        });
      });
  }

  renderTopGamesBoard(game) {
    const tBody = document.getElementById("table-body");
    let tr = document.createElement("tr");
    tr.dataset.userId = `${game.userId}`;
    tr.innerHTML = `<td></td><td>${game.username}</td><td>${game.score}</td>`;
    tBody.append(tr);
    this.assignPositionNumber(tBody);
  }

  sortedByScore() {
    let sortedGames = this.games.slice();
    return sortedGames.sort((a, b) => b.score - a.score);
  }

  ordinalNumber(num) {
    return ["st", "nd", "rd"][((num + 90) % 100 - 10) % 10 - 1] || "th";
  }


  assignPositionNumber(tBody) {
    const rows = Array.from(tBody.getElementsByTagName("tr"));

    for (let i = 0; i < tBody.childElementCount; i++) {
      rows.forEach(row => {
        let position = row.sectionRowIndex + 1;
        row.firstChild.innerHTML = position + this.ordinalNumber(position);
      });
    }
  }

}
