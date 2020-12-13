const balloons = [];
let lastBalloon;
let balloonDragged;
let balloonReplaced;
let balloonDraggedId;
let balloonReplacedId;

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
  const balloons = getBalloonImages(balloonImages, 2);
  const randIndex = Math.floor(Math.random() * balloons.length);
  const balloon = balloons[randIndex];

  if (0 < balloonsContainer.childElementCount) {
    if (balloon.id === lastBalloon.id) return pickRandomBalloon();
  }

  if (9 < balloonsContainer.childElementCount) {
    const array = Array.from(balloonsContainer.childNodes);
    const num = array.indexOf(lastBalloon) + 1;
    if (balloon.id === array[num - 10].id) return pickRandomBalloon();
  }

  lastBalloon = balloon;
  return balloon;
}

function renderBalloons() {
  for (let i = 0; balloonsContainer.childElementCount < 40; i++) {
    let randomBalloon = pickRandomBalloon();
    balloons.push(randomBalloon);
    balloonsContainer.append(randomBalloon);
  }
  addEventListenersToBalloons();
}

function addEventListenersToBalloons() {
  balloons.forEach((balloon) => {
    balloon.addEventListener("dragstart", dragStart);
    balloon.addEventListener("dragenter", (e) => { e.preventDefault(); });
    balloon.addEventListener("dragover", (e) => { e.preventDefault(); });
    balloon.addEventListener("drop", dragDrop);
  });
}

// occurs when the user starts to drag an element
let dragStart = (e) => {
  balloonDragged = e.target.src;
  balloonDraggedId = balloons.indexOf(e.target);
};

// occurs when the dragged element is dropped on the drop target
let dragDrop = (e) => {
  e.preventDefault();
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
