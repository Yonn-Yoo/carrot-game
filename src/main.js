"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 12;
const BUG_COUNT = 17;
const GAME_DURATION_SEC = 10;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let isStarted = false;
let score = 0;
let timer = null;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  isStarted = false;

  const icon = gameBtn.querySelector(".fa-solid");

  icon.classList.remove("fa-stop");
  icon.classList.add("fa-play");
  gameBtn.style.visibility = "visible";

  updateTimerText(GAME_DURATION_SEC);
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!isStarted) {
    return;
  }

  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    target.remove();
    sound.playBug();
    stopGameTimer();
    finishGame(false);
  }
}
//TODO: 8:50 ~

gameBtn.addEventListener("click", () => {
  if (isStarted) {
    stopGame();
    sound.playAlert();
  } else {
    startGame();
  }
});

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function startGame() {
  isStarted = true;
  sound.playBackground();
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  isStarted = false;
  stopGameTimer();
  hideGameButton();
  sound.pauseBackground();
  gameFinishBanner.showWithText("Retry❓");
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
    sound.playWin();
  } else {
    sound.playBug();
  }

  sound.pauseBackground();
  hideGameButton();
  stopGameTimer();
  stopGame();
  gameFinishBanner.showWithText(isWon ? "You Won!!🏆" : "You Lost 💩");
}

function stopGameTimer() {
  clearInterval(timer);
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
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}
