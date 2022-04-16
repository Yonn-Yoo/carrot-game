"use strict";

import * as sound from "./sound.js";
import Field from "./field.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.isStarted) {
        this.stop();
        sound.playAlert();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.isStarted = false;
    this.score = 0;
    this.timer = null;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.isStarted = true;
    sound.playBackground();
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  stop() {
    this.isStarted = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.pauseBackground();
    sound.playAlert();
    this.onGameStop && this.onGameStop("cancel");
  }

  finishGame(isWon) {
    this.isStarted = false;

    if (isWon) {
      sound.playWin();
    } else {
      sound.playBug();
    }

    sound.pauseBackground();
    this.hideGameButton();
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(isWon ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.isStarted) {
      return;
    }

    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finishGame(true);
      }
    } else if (item === "bug") {
      this.finishGame(false);
    }
  };

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;

    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finishGame(false);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  showStopBtn() {
    const icon = this.gameBtn.querySelector(".fa-solid");

    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }
}
