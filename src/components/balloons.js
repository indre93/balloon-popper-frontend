const popSound = new Audio("sounds/pop.mp3");
const balloons = [];
const columnNum = 12;
const rowNum = 5;
let lastBalloon;
let balloonDragged;
let balloonReplaced;
let balloonDraggedColorId;
let balloonReplacedColorId;
let balloonDraggedIndex;
let balloonReplacedIndex;

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
        img.dataset.popped = popped;
        img.src = balloonImg;
        return img;
    });
}

function getBalloonColor(img, index) {
    return img.match(/[\w\$]+/g)[index];
}

function pickRandomBalloon() {
    const balloons = getBalloonImages(balloonImages, 2);
    const randomBalloon = balloons[Math.floor(Math.random() * balloons.length)];

    if (0 < container.balloonsContainer.childElementCount) {
        if (randomBalloon.id === lastBalloon.id) return pickRandomBalloon();
    }
    if ((columnNum - 1) < container.balloonsContainer.childElementCount) {
        const array = Array.from(container.balloonsContainer.childNodes);
        const num = array.indexOf(lastBalloon) + 1;
        if (randomBalloon.id === array[num - columnNum].id) return pickRandomBalloon();
    }
    lastBalloon = randomBalloon;
    return randomBalloon;
}

function renderBalloons() {
    for (let i = 0; container.balloonsContainer.childElementCount < (columnNum * rowNum); i++) {
        let randomBalloon = pickRandomBalloon();
        balloons.push(randomBalloon);
        container.balloonsContainer.append(randomBalloon);
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
    balloonDraggedColorId = e.target.id;
    balloonDraggedIndex = balloons.indexOf(e.target);
};

// occurs when the dragged element is dropped on the drop target
let dragDrop = (e) => {
    e.preventDefault();
    balloonReplaced = e.target.src;
    balloonReplacedColorId = e.target.id;
    balloonReplacedIndex = balloons.indexOf(e.target);
    validMove();
};

let validMove = () => {
    let validMoves = [
        balloonDraggedIndex - columnNum,
        balloonDraggedIndex - 1,
        balloonDraggedIndex + 1,
        balloonDraggedIndex + columnNum,
    ];
    let validMove = validMoves.includes(balloonReplacedIndex);

    if ((balloonReplacedIndex || balloonReplacedIndex === 0) && validMove) {
        balloons[balloonReplacedIndex].src = balloonDragged;
        balloons[balloonDraggedIndex].src = balloonReplaced;
        balloons[balloonReplacedIndex].id = balloonDraggedColorId;
        balloons[balloonDraggedIndex].id = balloonReplacedColorId;
    } else if (balloonReplacedIndex && !validMove) {
        balloons[balloonReplacedIndex].src = balloonReplaced;
        balloons[balloonDraggedIndex].src = balloonDragged;
    } else {
        balloons[balloonDraggedIndex].src = balloonDragged;
    }
};

function checkForMatchingBalloons() {
    checkForFiveRowMatch();
    checkForFourRowMatch();
    checkForThreeRowMatch();
    checkForFiveColumnMatching();
    checkForFourColumnMatching();
    checkForThreeColumnMatching();
}

function checkForThreeRowMatch() {
    for (let i = 0; i <= 57; i++) {
        let possibleMatch = [i, i + 1, i + 2];
        let notValid = [10, 11, 22, 23, 34, 35, 46, 47];
        if (notValid.includes(i)) continue;
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function checkForFourRowMatch() {
    for (let i = 0; i <= 56; i++) {
        let possibleMatch = [i, i + 1, i + 2, i + 3];
        let notValid = [9, 10, 11, 21, 22, 23, 33, 34, 35, 45, 46, 47];
        if (notValid.includes(i)) continue;
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function checkForFiveRowMatch() {
    for (let i = 0; i <= 55; i++) {
        let possibleMatch = [i, i + 1, i + 2, i + 3, i + 4];
        let notValid = [8, 9, 10, 11, 20, 21, 22, 23, 32, 33, 34, 35, 44, 45, 46, 47];
        if (notValid.includes(i)) continue;
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function checkForThreeColumnMatching() {
    for (let i = 0; i <= 35; i++) {
        let possibleMatch = [i, i + 12, i + 12 * 2];
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function checkForFourColumnMatching() {
    for (let i = 0; i <= 23; i++) {
        let possibleMatch = [i, i + 12, i + 12 * 2, i + 12 * 3];
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function checkForFiveColumnMatching() {
    for (let i = 0; i <= 11; i++) {
        let possibleMatch = [i, i + 12, i + 12 * 2, i + 12 * 3, i + 12 * 4];
        if (balloons[i].dataset.popped === "false") {
            popBalloon(possibleMatch, balloons[i]);
        }
    }
}

function popBalloon(matchingArray, matchingBalloon) {
    if (matchingArray.every(index => balloons[index].src === matchingBalloon.src)) {
        matchingArray.forEach(index => {
            popSound.play();
            balloons[index].src = "images/pop.png";
            balloons[index].dataset.popped = "true";

            setTimeout(() => {
                if (balloons[index].dataset.popped === "true") {
                    updateGameTarget(balloons[index]);
                    document.querySelector("#score-count>p>span").innerHTML = `${(score += 10)}`;
                    balloons[index].dataset.popped = "null";
                    balloons[index].src = "";
                }
            }, 100);

        });
    }
}
