class Game {
  constructor(id, username, score) {
    this.id = id;
    this.username = username;
    this.score = score;
  }

  begin() {
    renderBalloons(balloonImages, 2, false);
    this.checkForMatchingBalloons();
    this.updateAction();
  }

  updateAction() {
    setInterval(() => {
      if (balloons.every(balloon => balloon.getAttribute("popped") === "false")) {
        this.checkForMatchingBalloons();
      } else {
        balloons.forEach(balloon => {
          if (balloon.getAttribute("popped") === "true") {
            updateGameTarget(balloon);
            scoreCount.innerHTML = `<p>Score: ${(score += 10)}</p>`;
            balloon.setAttribute("popped", "null");
            balloon.src = "";
          }
        });
      }
    }, 100);
  }

  moveBalloonsUp() {
    for (let i = 39; 9 < i; i--) {
      if (balloons[i - 10].currentSrc === "") {
        balloons[i - 10].src = balloons[i].src;
        balloons[i].src = "";
      }
    }
  }

  popBalloon(matchingArray, matchingBalloon) {
    if (matchingArray.every(index => balloons[index].src === matchingBalloon.src)) {
      matchingArray.forEach(index => {
        popSound.play();
        balloons[index].src = "images/balloons/pop.png";
        balloons[index].setAttribute("popped", "true");
      });
    }
  }

  checkForMatchingBalloons() {
    this.checkForFiveRowMatch();
    this.checkForFourRowMatch();
    this.checkForThreeRowMatch();
    this.checkForFourColumnMatching();
    this.checkForThreeColumnMatching();
  }

  checkForThreeRowMatch() {
    for (let i = 0; i <= 37; i++) {
      let possibleMatch = [i, i + 1, i + 2];
      let notValid = [8, 9, 18, 19, 28, 29];
      if (notValid.includes(i)) continue;
      this.popBalloon(possibleMatch, balloons[i]);
    }
  }

  checkForFourRowMatch() {
    for (let i = 0; i <= 36; i++) {
      let possibleMatch = [i, i + 1, i + 2, i + 3];
      let notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29];
      if (notValid.includes(i)) continue;
      this.popBalloon(possibleMatch, balloons[i]);
    }
  }

  checkForFiveRowMatch() {
    for (let i = 0; i <= 35; i++) {
      let possibleMatch = [i, i + 1, i + 2, i + 3, i + 4];
      let notValid = [6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28, 29];
      if (notValid.includes(i)) continue;
      this.popBalloon(possibleMatch, balloons[i]);
    }
  }

  checkForThreeColumnMatching() {
    for (let i = 0; i <= 19; i++) {
      let possibleMatch = [i, i + 10, i + 10 * 2];
      this.popBalloon(possibleMatch, balloons[i]);
    }
  }

  checkForFourColumnMatching() {
    for (let i = 0; i <= 9; i++) {
      let possibleMatch = [i, i + 10, i + 10 * 2, i + 10 * 3];
      this.popBalloon(possibleMatch, balloons[i]);
    }
  }

}
