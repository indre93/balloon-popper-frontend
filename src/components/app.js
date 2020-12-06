class App {
  constructor() {
    this.games = new Games();
    this.users = new Users();
    this.game = new Game();
    this.initBindingsAndEventListeners();
    this.score = 0;
  }

  initBindingsAndEventListeners() {
    this.createNewGame();
    this.userForm = document.getElementById("new-user-container");
  }

  createNewGame() {
    this.game.start();
    this.startTimer(60 * 2);
  }

  startTimer(duration) {
    let countdown = document.getElementById("timer");
    let timer = duration, minutes, seconds;
    let counter = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      countdown.innerHTML = `<p>${minutes}:${seconds}</p>`;
      --timer;
      if (timer < 0) clearInterval(counter);
    }, 1000);
  };

  updateScore(amount) {
    let score = 0;
    let scoreCount = document.getElementById("score-count");
    let scoreAmount = score += amount;
    scoreCount.innerHTML = `<p>Score: ${(scoreAmount)}</p>`;
  }

  // renderUserForm() {
  //   document.addEventListener("DOMContentLoaded", (e) => {
  //     if (e.type === "DOMContentLoaded") {
  //       this.userForm.style.display = "block";
  //       this.userForm.addEventListener("submit", createGame);
  //     }
  //   });
  // }

  // createGame() {
  //   console.log("game is being created");
  // }

}
