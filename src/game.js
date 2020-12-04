class Game {
  constructor(id, username, score) {
    this.id = id;
    this.username = username;
    this.score = score;
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
      `<td></td>
      <td>${this.username}</td>
      <td>${this.score}</td>`
    );

    this.assignPositionNumber(tBody);
  }

}
