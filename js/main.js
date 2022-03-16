"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 12;
const BUG_COUNT = 17;
const GAME_DURATION_SEC = 10;

const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefreshBtn = document.querySelector(".pop-up__refresh");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgm = new Audio("./sound/bg.mp3");

let isStarted = false;
let score = 0;
let timer = null;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (isStarted) {
    stopGame();
    playSound(alertSound);
  } else {
    startGame();
  }
});

function onFieldClick(event) {
  if (!isStarted) {
    return;
  }

  const target = event.target;
  // FIXME: use switch
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    target.remove();
    playSound(bugSound);
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

popUpRefreshBtn.addEventListener("click", () => {
  isStarted = false;

  const icon = gameBtn.querySelector(".fa-solid");

  icon.classList.remove("fa-stop");
  icon.classList.add("fa-play");
  gameBtn.style.visibility = "visible";

  hidePopUp();
  updateTimerText(GAME_DURATION_SEC);
});

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

function startGame() {
  isStarted = true;
  playSound(bgm);
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  isStarted = false;
  stopGameTimer();
  hideGameButton();
  pauseSound(bgm);
  showPopUpWithText("Retry❓");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;

  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function finishGame(isWon) {
  isStarted = false;

  if (isWon) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }

  pauseSound(bgm);
  hideGameButton();
  stopGameTimer();
  stopGame();
  showPopUpWithText(isWon ? "You Won!!🏆" : "You Lost 💩");
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showStopBtn() {
  const icon = gameBtn.querySelector(".fa-solid");

  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function initGame() {
  field.innerHTML = "";
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "./img/carrot.png");
  addItem("bug", BUG_COUNT, "./img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  // FIXME:
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");

    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min);
}
