"use strict";

const carrot_size = 80;
const carrot_count = 10;
const bug_count = 40;
const game_duration_sec = 12;

const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");
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

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
    playSound(alertSound);
  } else {
    startGame();
  }
});

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === carrot_count) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    target.remove();
    playSound(bugSound);
    stopGameTimer();
    finishGame(false);
  }
}

popUpRefresh.addEventListener("click", () => {
  started = false;
  const icon = gameBtn.querySelector(".fa-solid");
  icon.classList.remove("fa-stop");
  icon.classList.add("fa-play");
  hidePopUp();
  gameTimer.innerText = `0:${game_duration_sec}`;
  gameBtn.style.visibility = "visible";
  updateScoreBoard();
});

function finishGame(win) {
  started = false;
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  pauseSound(bgm);
  hideGameButton();
  stopGameTimer();
  stopGame();
  showPopUpWithText(win ? "You Won!!🏆" : "You Lost 💩");
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = carrot_count - score;
}

function startGame() {
  started = true;
  playSound(bgm);
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
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
  let remainingTimeSec = game_duration_sec;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(carrot_count === 0);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
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
  gameScore.innerText = carrot_count;
  // 벌레와 당근을 생성한 뒤 필드에 추가해줌
  addItem("carrot", carrot_count, "./img/carrot.png");
  addItem("bug", bug_count, "./img/bug.png");
  score = 0;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrot_size;
  const y2 = fieldRect.height - carrot_size;
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
  return Math.random() * (max - min) + min;
}
