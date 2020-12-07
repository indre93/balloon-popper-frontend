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
          game.user.username,
          game.score
        )));
      })
      .then(() => {
        this.games.forEach(game => {
          this.renderTopGamesBoard(game);
        });
      });
  }

  renderTopGamesBoard(game) {
    const tBody = document.getElementById("table-body");
    let tr = document.createElement("tr");
    tr.innerHTML = `<td></td><td>${game.username}</td><td>${game.score}</td>`;

    if (tBody.hasChildNodes()) {
      (tBody.firstChild.id < game.score) ? tBody.prepend(tr) : tBody.append(tr);
    } else tBody.prepend(tr);

    this.assignPositionNumber(tBody);
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
