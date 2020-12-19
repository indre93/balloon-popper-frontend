const modalForm = document.querySelector(".user-form-modal");
const modalTable = document.querySelector(".scoreboard-modal");
const modalEndGame = document.querySelector(".end-game-modal");
const balloonsContainer = document.querySelector(".balloons-container");
const gameHeader = document.querySelectorAll("#game-header>.fireworks");
const mainHeader = document.querySelector("#main-header");
const gameTargetGoal = document.querySelector(".game-target-goal");

let display = {
    welcomeView: () => {
        renderForm();
        renderHeader();
        renderLogo(gameTargetGoal, 150);
        modalForm.style.display = "block";
        balloonsContainer.style.display = "none";
        modalEndGame.style.display = "none";
        modalTable.style.display = "none";
    },
    gameView: () => {
        renderGame();
        modalForm.style.display = "none";
        balloonsContainer.style.display = "grid";
        modalEndGame.style.display = "none";
        modalTable.style.display = "none";
    },
    endGameView: () => {
        renderEndGame();
        modalForm.style.display = "none";
        balloonsContainer.style.display = "none";
        modalEndGame.style.display = "grid";
        modalTable.style.display = "none";
    },
    scoreboardView: () => {
        modalForm.style.display = "none";
        balloonsContainer.style.display = "none";
        modalEndGame.style.display = "none";
        modalTable.style.display = "grid";
    }
};

function renderForm() {
    const form = document.createElement("form");
    form.className = "new-user-form";
    modalForm.append(form);
    form.innerHTML = `
      <label for="username">Username:</label>
      <input id="username" type="text" placeholder="Enter a username" name="username" required>
      <input id="start-game-btn" type="submit" value="Start Game">`;
}

function renderHeader() {
    mainHeader.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
    gameHeader.forEach(div => {
        const img = document.createElement("img");
        img.src = "images/fireworks.png";
        div.append(img);
    });
}

function renderLogo(container, endingPos) {
    const balloonsImg = document.createElement("img");
    balloonsImg.src = "images/balloons-logo.png";
    balloonsImg.id = "balloons";
    container.prepend(balloonsImg);
    movingLogo(balloonsImg, endingPos);
}

function movingLogo(img, endingPos) {
    let pos = 500;
    let id = setInterval(frame, 10);
    function frame() {
        if (pos == endingPos) {
            clearInterval(id);
        } else {
            pos--;
            img.style.top = pos + "px";
        }
    }
}

function renderGame() {
    gameTargetGoal.firstElementChild.remove();
    mainHeader.innerHTML = `<h1>Hi! ${username}</h1>`;
    renderBalloons(balloonImages, 2, false);
    renderGameTargetGoals();
}

function renderGameTargetGoals() {
    getBalloonImages(balloonExpectationImgs, 4).forEach(balloon => {
        const arrowImg = document.createElement("img");
        const span = document.createElement("span");
        span.id = balloon.id;
        arrowImg.id = "arrow-img";
        arrowImg.src = "images/arrow.png";
        span.innerHTML = Math.floor(Math.random() * 4) + 5;
        balloonTargetGoals.append(balloon, arrowImg, span);
    });
}

function renderEndGame() {
    const balloonsDiv1 = document.createElement("div");
    const balloonsDiv2 = document.createElement("div");
    const endGameContainer = document.createElement("div");
    const button = document.createElement("button");
    balloonsDiv1.className = "balloons-img";
    balloonsDiv2.className = "balloons-img";
    endGameContainer.id = "end-game-container";
    button.id = "end-game-btn";
    endGameContainer.innerHTML = '<h1 id="final-score"></h1>';
    endGameContainer.append(button);
    modalEndGame.append(balloonsDiv1, endGameContainer, balloonsDiv2);

    if (gameStatus === "won") {
        renderWonGame(endGameContainer, button);
    } else if (gameStatus === "lost") {
        renderLostGame(endGameContainer, button);
    }
}

function renderWonGame(endGameContainer, button) {
    document.querySelectorAll(".balloons-img").forEach(div => renderLogo(div, -190));
    document.querySelector("#final-score").innerHTML = score;
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    h1.innerHTML = "You Win!";
    p.innerHTML = "Final Score:";
    endGameContainer.prepend(h1, p);
    gameHeader.forEach(div => div.className += " animate");
    button.innerHTML = "<p>See Scoreboard</p>";
}

function renderLostGame(endGameContainer, button) {
    modalEndGame.style.gridTemplateColumns = "150px auto 150px";
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    h1.innerHTML = "Sorry...you lost";
    h2.innerHTML = "you were so close!";
    endGameContainer.prepend(h1, h2);
    button.innerHTML = "<p>Try Again</p>";
}

function renderScoreboard() {
    modalTable.innerHTML = `
      <div id="scoreboard-tableContainer">
        <table class="tableClass">
          <thead>
            <tr>
              <th colspan="3">
                <h1>Top Scores</h1>
              </th>
            </tr>
            <tr>
              <td>Position</td>
              <td>User</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
      </div>`;
}
