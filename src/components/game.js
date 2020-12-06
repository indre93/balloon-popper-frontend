class Game {
  constructor(id, username, score) {
    this.id = id;
    this.username = username;
    this.score = score;
  }

  start() {
    this.renderBalloons();
    this.addEventListenersToBalloons();
    setInterval(() => {
      const balloons = Array.from(document.querySelectorAll("#game-container > img"));
      this.moveBalloonsUp(balloons);
      this.checkForFiveRowMatch(balloons);
      this.checkForFourRowMatch(balloons);
      this.checkForThreeRowMatch(balloons);
      this.checkForFourColumnMatching(balloons);
      this.checkForThreeColumnMatching(balloons);
    }, 300);
  }

  getBalloonImages() {
    const balloonImages = [
      "images/balloons/blue.png",
      "images/balloons/green.png",
      "images/balloons/orange.png",
      "images/balloons/purple.png",
      "images/balloons/red.png",
      "images/balloons/yellow.png"
    ];

    return balloonImages.map(balloonImg => {
      const img = document.createElement("img");
      img.src = balloonImg;
      return img;
    });
  }

  pickRandomBalloon() {
    let balloons = this.getBalloonImages();
    return balloons[Math.floor(Math.random() * balloons.length)];
  }

  renderBalloons() {
    const gameContainer = document.getElementById("game-container");

    for (let i = 0; gameContainer.childElementCount <= 40; i++) {
      let randomBalloon = this.pickRandomBalloon();
      gameContainer.append(randomBalloon);
    }
  }

  addEventListenersToBalloons() {
    const balloons = Array.from(document.querySelectorAll("#game-container > img"));
    let balloonDragged;
    let balloonReplaced;
    let balloonDraggedId;
    let balloonReplacedId;

    // occurs when the user starts to drag an element
    let dragStart = (e) => {
      balloonDragged = e.target.src;
      balloonDraggedId = balloons.indexOf(e.target);
    };

    // occurs when the dragged element is dropped on the drop target
    let dragDrop = (e) => {
      balloonReplaced = e.target.src;
      balloonReplacedId = balloons.indexOf(e.target);
      validMove();
    };

    let validMove = () => {
      let validMoves = [
        balloonDraggedId - 10,
        balloonDraggedId - 1,
        balloonDraggedId + 1,
        balloonDraggedId + 10,
      ];

      let validMove = validMoves.includes(balloonReplacedId);

      if ((balloonReplacedId || balloonReplacedId === 0) && validMove) {
        balloons[balloonReplacedId].src = balloonDragged;
        balloons[balloonDraggedId].src = balloonReplaced;
      } else if (balloonReplacedId && !validMove) {
        balloons[balloonReplacedId].src = balloonReplaced;
        balloons[balloonDraggedId].src = balloonDragged;
      } else {
        balloons[balloonDraggedId].src = balloonDragged;
      }
    };

    balloons.forEach((balloon) => {
      balloon.addEventListener("dragstart", dragStart);
      balloon.addEventListener("dragenter", (e) => { e.preventDefault(); });
      balloon.addEventListener("dragover", (e) => { e.preventDefault(); });
      balloon.addEventListener("drop", dragDrop);
    });
  }

  checkForThreeRowMatch(balloons) {
    for (let i = 0; i <= 37; i++) {
      let matchingBalloon = balloons[i].src;
      let possibleRowMatch = [i, i + 1, i + 2];
      let notValid = [8, 9, 18, 19, 28, 29];

      if (notValid.includes(i)) continue;
      if (possibleRowMatch.every(index => balloons[index].src === matchingBalloon)) {
        possibleRowMatch.forEach(index => {
          balloons[index].src = "";
        });
      }
    }
  }

  checkForFourRowMatch(balloons) {
    for (let i = 0; i <= 36; i++) {
      let matchingBalloon = balloons[i].src;
      let possibleRowMatch = [i, i + 1, i + 2, i + 3];
      let notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29];

      if (notValid.includes(i)) continue;
      if (possibleRowMatch.every(index => balloons[index].src === matchingBalloon)) {
        possibleRowMatch.forEach(index => {
          balloons[index].src = "";
        });
      }
    }
  }

  checkForFiveRowMatch(balloons) {
    for (let i = 0; i <= 35; i++) {
      let matchingBalloon = balloons[i].src;
      let possibleRowMatch = [i, i + 1, i + 2, i + 3, i + 4];
      let notValid = [6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28, 29];

      if (notValid.includes(i)) continue;
      if (possibleRowMatch.every(index => balloons[index].src === matchingBalloon)) {
        possibleRowMatch.forEach(index => {
          balloons[index].src = "";
        });
      }
    }
  }

  checkForThreeColumnMatching(balloons) {
    for (let i = 0; i <= 19; i++) {
      let matchingBalloon = balloons[i].src;
      let possibleColumnMatch = [i, i + 10, i + 10 * 2];

      if (possibleColumnMatch.every(index => balloons[index].src === matchingBalloon)) {
        possibleColumnMatch.forEach(index => {
          balloons[index].src = "";
        });
      }
    }
  }

  checkForFourColumnMatching(balloons) {
    for (let i = 0; i <= 9; i++) {
      let matchingBalloon = balloons[i].src;
      let possibleColumnMatch = [i, i + 10, i + 10 * 2, i + 10 * 3];

      if (possibleColumnMatch.every(index => balloons[index].src === matchingBalloon)) {
        possibleColumnMatch.forEach(index => {
          balloons[index].src = "";
        });
      }
    }
  }

  moveBalloonsUp(balloons) {
    for (let i = 39; 9 < i; i--) {
      if (balloons[i - 10].currentSrc === "") {
        balloons[i - 10].src = balloons[i].src;
        balloons[i].src = "";
        this.checkAndFillEmptySpaces(i);
      }
      this.checkAndFillEmptySpaces(i);
    }
  }

  checkAndFillEmptySpaces(i) {
    const lastRow = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
    const isLastRow = lastRow.includes(i);

    const balloons = Array.from(document.querySelectorAll("#game-container > img"));
    if (isLastRow && (balloons[i].currentSrc === "")) {
      let randomBalloon = this.pickRandomBalloon();
      setTimeout(() => balloons[i].src = randomBalloon.src, 200);
    }
  }

  SoundEffect() {
    let popSound = new Audio("sounds/pop.mp3");
    return popSound.play();
  }

}
