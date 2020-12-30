class Container {
    constructor() {
        this.initBindings();
    }

    initBindings() {
        this.modalForm = document.querySelector(".user-form-modal");
        this.modalTable = document.querySelector(".scoreboard-modal");
        this.modalEndGame = document.querySelector(".end-game-modal");
        this.gameHeader = document.querySelectorAll("#game-header>.fireworks");
        this.mainHeader = document.querySelector("#main-header");
        this.gameTargetGoal = document.querySelector(".game-target-goal");
    }

    welcomeView() {
        this.modalForm.style.display = "block";
        balloonsContainer.style.display = "none";
        this.modalEndGame.style.display = "none";
        this.modalTable.style.display = "none";
        this.renderForm();
        this.renderHeader();
        this.renderLogo(this.gameTargetGoal, 150);
    }

    gameView() {
        this.modalForm.style.display = "none";
        balloonsContainer.style.display = "grid";
        this.modalEndGame.style.display = "none";
        this.modalTable.style.display = "none";
        this.renderGame();
    }

    endGameView() {
        this.modalForm.style.display = "none";
        balloonsContainer.style.display = "none";
        this.modalEndGame.style.display = "grid";
        this.modalTable.style.display = "none";
        this.renderEndGame();
    }

    scoreBoardView() {
        this.modalForm.style.display = "none";
        balloonsContainer.style.display = "none";
        this.modalEndGame.style.display = "none";
        this.modalTable.style.display = "grid";
    }

    renderForm() {
        const form = document.createElement("form");
        form.className = "new-user-form";
        this.modalForm.append(form);
        form.innerHTML = `
      <label for="username">Username:</label>
      <input id="username" type="text" placeholder="Enter a username" name="username" required>
      <input id="start-game-btn" type="submit" value="Start Game">`;
    }

    renderHeader() {
        this.mainHeader.innerHTML = "<h1>Welcome to the Balloon Popper Game!</h1>";
        this.gameHeader.forEach(div => {
            const img = document.createElement("img");
            img.src = "images/fireworks.png";
            div.append(img);
        });
    }

    renderLogo(container, endingPos) {
        const balloonsImg = document.createElement("img");
        balloonsImg.src = "images/balloons-logo.png";
        balloonsImg.id = "balloons";
        container.prepend(balloonsImg);
        this.movingLogo(balloonsImg, endingPos);
    }

    movingLogo(img, endingPos) {
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

    renderGame() {
        this.gameTargetGoal.firstElementChild.remove();
        this.mainHeader.innerHTML = `<h1>Hi! ${username}</h1>`;
        renderBalloons(balloonImages, 2, false);
        this.renderGameTargetGoals();
    }

    renderGameTargetGoals() {
        getBalloonImages(balloonExpectationImgs, 4).forEach(balloon => {
            const arrowImg = document.createElement("img");
            const span = document.createElement("span");
            span.id = balloon.id;
            arrowImg.id = "arrow-img";
            arrowImg.src = "images/arrow.png";
            span.innerHTML = Math.floor(Math.random() * 1) + 1;
            balloonTargetGoals.append(balloon, arrowImg, span);
        });
    }

    renderEndGame() {
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
        this.modalEndGame.append(balloonsDiv1, endGameContainer, balloonsDiv2);

        if (gameStatus === "won") {
            this.renderWonGame(endGameContainer, button);
        } else if (gameStatus === "lost") {
            this.renderLostGame(endGameContainer, button);
        }
    }

    renderWonGame(endGameContainer, button) {
        document.querySelectorAll(".balloons-img").forEach(div => this.renderLogo(div, -190));
        document.querySelector("#final-score").innerHTML = score;
        const h1 = document.createElement("h1");
        const p = document.createElement("p");
        h1.innerHTML = "You Win!";
        p.innerHTML = "Final Score:";
        endGameContainer.prepend(h1, p);
        this.gameHeader.forEach(div => div.className += " animate");
        button.innerHTML = "<p>See Scoreboard</p>";
    }

    renderLostGame(endGameContainer, button) {
        this.modalEndGame.style.gridTemplateColumns = "150px auto 150px";
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        h1.innerHTML = "Sorry...you lost";
        h2.innerHTML = "you were so close!";
        endGameContainer.prepend(h1, h2);
        button.innerHTML = "<p>Try Again</p>";
    }

    renderScoreboard() {
        this.modalTable.innerHTML = `
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
}

