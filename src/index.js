const balloonTargetGoals = document.querySelector("#balloon-target-goals");
let container = new Container();
let duration = 60 * 3;
let username;
let score = 0;
let timeUp = false;
let currentUser;
let gameStatus; // pending, won, lost

document.addEventListener("DOMContentLoaded", () => {
    welcome();
    startOver();
});

function welcome() {
    container.welcomeView();
    getCurrentUser();
}

function getCurrentUser() {
    const userForm = document.querySelector(".new-user-form");
    const userInput = document.querySelector("input#username");
    userForm.addEventListener("submit", (e) => {
        if (e.type === "submit") {
            e.preventDefault();
            username = userInput.value;
            startNewGame();
        }
    });
}

function startNewGame() {
    container.gameView();
    startTimer(duration);

    let mainLoop = () => {
        gameState();
        if (gameStatus === "pending") {
            requestAnimationFrame(mainLoop);
        } else {
            cancelAnimationFrame(mainLoop);
        }
    };
    mainLoop();
}

function updateGameTarget(balloon) {
    const array = Array.from(balloonTargetGoals.getElementsByTagName("span"));
    const targetElem = array.find(elem => elem.id === balloon.id);
    const checkImg = document.createElement("img");
    checkImg.src = "images/check.png";
    checkImg.id = "checkMark";

    setTimeout(() => {
        if (typeof targetElem !== "undefined") {
            if (0 < targetElem.innerHTML) {
                targetElem.innerHTML -= 1;
                if (targetElem.innerHTML <= 0) targetElem.replaceWith(checkImg);
            }
        }
    }, 0);
}

function startTimer(duration) {
    const countdown = document.querySelector("#timer");
    let timer = duration, minutes, seconds;
    let counter = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdown.innerHTML = `<p>${minutes}:${seconds}</p>`;
        --timer;

        if (timer < 20) {
            countdown.childNodes[0].className = "blink";
        }
        if (timer < 0) {
            countdown.childNodes[0].className = "";
            clearInterval(counter);
            timeUp = true;
        }
        if (gameStatus === "won") {
            clearInterval(counter);
            countdown.childNodes[0].className = "";
            countdown.children[0].innerHTML = "00:00";
        }
    }, 1000);
};

function gameState() {
    const array = Array.from(balloonTargetGoals.getElementsByTagName("img"));
    const checkMarks = array.filter(elem => elem.id === "checkMark");

    if (!timeUp && checkMarks.length === 6) {
        gameStatus = "won";
        wonGame();
    } else if (timeUp && checkMarks.length != 6) {
        gameStatus = "lost";
        gameOver();
    } else {
        gameStatus = "pending";
        checkForMatchingBalloons();
    }
}

async function addUserAndGameData() {
    const user = await adapter.createUser(username);
    await adapter.createGame(user, score);
    currentUser = user;
    new Games();
}

function highlightCurrentUser() {
    const trows = Array.from(document.getElementsByTagName("tr"));
    const row = trows.find(row => Number(row.dataset.userId) === currentUser.id);
    row.style.backgroundColor = "rgba(31, 50, 59, 0.429)";
    row.style.borderRadius = "0px";
}

function wonGame() {
    container.endGameView();
    addUserAndGameData();
    document.getElementById("end-game-btn").addEventListener("click", (e) => {
        if (e.type === "click") {
            e.preventDefault();
            container.scoreBoardView();
            highlightCurrentUser();
        }
    });
}

function gameOver() {
    gameStatus = "lost";
    container.endGameView();
    document.getElementById("end-game-btn").addEventListener("click", (e) => {
        if (e.type === "click") {
            e.preventDefault();
            location.reload();
        }
    });
}

function startOver() {
    document.getElementById("start-over-btn").addEventListener("click", (e) => {
        if (e.type === "click") {
            e.preventDefault();
            location.reload();
        }
    });
}
