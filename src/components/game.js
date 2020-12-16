class Game {
  constructor(id, username, score) {
    this.id = id;
    this.username = username;
    this.score = score;
  }

  begin() {
    renderBalloons(balloonImages, 2, false);
  }

  checkForMatchingBalloons() {
    this.checkForFiveRowMatch();
    this.checkForFourRowMatch();
    this.checkForThreeRowMatch();
    this.checkForFiveColumnMatching();
    this.checkForFourColumnMatching();
    this.checkForThreeColumnMatching();
  }

  popBalloon(matchingArray, matchingBalloon) {
    if (matchingArray.every(index => balloons[index].src === matchingBalloon.src)) {
      matchingArray.forEach(index => {
        balloons[index].src = "images/pop.png";
        popSound.play();
        balloons[index].setAttribute("popped", "true");

        setTimeout(() => {
          if (balloons[index].getAttribute("popped") === "true") {
            updateGameTarget(balloons[index]);
            scoreCount.innerHTML = `${(score += 10)}`;
            balloons[index].setAttribute("popped", "null");
            balloons[index].src = "";
          }
        }, 100);
      });
    }
  }

  checkForThreeRowMatch() {
    for (let i = 0; i <= 57; i++) {
      let possibleMatch = [i, i + 1, i + 2];
      let notValid = [10, 11, 22, 23, 34, 35, 46, 47];
      if (notValid.includes(i)) continue;
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

  checkForFourRowMatch() {
    for (let i = 0; i <= 56; i++) {
      let possibleMatch = [i, i + 1, i + 2, i + 3];
      let notValid = [9, 10, 11, 21, 22, 23, 33, 34, 35, 45, 46, 47];
      if (notValid.includes(i)) continue;
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

  checkForFiveRowMatch() {
    for (let i = 0; i <= 55; i++) {
      let possibleMatch = [i, i + 1, i + 2, i + 3, i + 4];
      let notValid = [8, 9, 10, 11, 20, 21, 22, 23, 32, 33, 34, 35, 44, 45, 46, 47];
      if (notValid.includes(i)) continue;
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

  checkForThreeColumnMatching() {
    for (let i = 0; i <= 35; i++) {
      let possibleMatch = [i, i + 12, i + 12 * 2];
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

  checkForFourColumnMatching() {
    for (let i = 0; i <= 23; i++) {
      let possibleMatch = [i, i + 12, i + 12 * 2, i + 12 * 3];
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

  checkForFiveColumnMatching() {
    for (let i = 0; i <= 11; i++) {
      let possibleMatch = [i, i + 12, i + 12 * 2, i + 12 * 3, i + 12 * 4];
      if (balloons[i].getAttribute("popped") === "false") {
        this.popBalloon(possibleMatch, balloons[i]);
      }
    }
  }

}
