const balloonsContainer = document.querySelector(".balloons-container");
const balloons = [];

const balloonImages = [
  "images/balloons/blue.png",
  "images/balloons/green.png",
  "images/balloons/orange.png",
  "images/balloons/purple.png",
  "images/balloons/red.png",
  "images/balloons/yellow.png"
];

const balloonExpectationImgs = [
  "images/balloons/target-balloons/blue.png",
  "images/balloons/target-balloons/green.png",
  "images/balloons/target-balloons/orange.png",
  "images/balloons/target-balloons/purple.png",
  "images/balloons/target-balloons/red.png",
  "images/balloons/target-balloons/yellow.png"
];

function getBalloonImages(images, index, popped = false) {
  return images.map(balloonImg => {
    const img = document.createElement("img");
    const color = getBalloonColor(balloonImg, index);
    img.id = color + "-balloon";
    img.setAttribute("popped", popped);
    img.src = balloonImg;
    return img;
  });
}

function getBalloonColor(img, index) {
  return img.match(/[\w\$]+/g)[index];
}

function pickRandomBalloon() {
  let balloons = getBalloonImages(balloonImages, 2);
  return balloons[Math.floor(Math.random() * balloons.length)];
}

function renderBalloons() {
  for (let i = 0; balloonsContainer.childElementCount < 40; i++) {
    let randomBalloon = pickRandomBalloon();
    balloons.push(randomBalloon);
    balloonsContainer.append(randomBalloon);
  }
}
