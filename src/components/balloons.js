const gameContainer = document.getElementById("game-container");
const balloonImages = [
  "images/balloons/blue.png",
  "images/balloons/green.png",
  "images/balloons/orange.png",
  "images/balloons/purple.png",
  "images/balloons/red.png",
  "images/balloons/yellow.png"
];

function getBalloonImages() {
  return balloonImages.map(balloonImg => {
    const img = document.createElement("img");
    img.src = balloonImg;
    return img;
  });
}

function pickRandomBalloon() {
  let balloons = this.getBalloonImages();
  return balloons[Math.floor(Math.random() * balloons.length)];
}

function renderBalloons() {
  for (let i = 0; gameContainer.childElementCount <= 40; i++) {
    let randomBalloon = this.pickRandomBalloon();
    gameContainer.append(randomBalloon);
  }
}
