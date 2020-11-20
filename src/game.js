class Game {
  constructor(id, username, score, created_at) {
    this.id = id;
    this.username = username;
    this.score = score;
    this.created_at = created_at;
  }

  get datePlayed() {
    let formatDate = new Date(`${this.created_at}`);
    let date = formatDate.toDateString();
    return date;
  }

  renderTopGames() {
    const tBody = document.getElementById("table-body");
    let tr = document.createElement("tr");
    tr.id = `${this.score}`;

    if (tBody.hasChildNodes()) {
      (tBody.firstChild.id < this.score) ? tBody.prepend(tr) : tBody.append(tr);
    }
    else {
      tBody.prepend(tr);
    }

    tr.insertAdjacentHTML('afterbegin',
      `<td>${this.username}</td>
      <td>${this.score}</td>
      <td>${this.datePlayed}</td>`);
  }

}
