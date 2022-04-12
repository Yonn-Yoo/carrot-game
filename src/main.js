"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  isStarted = false;

  const icon = gameBtn.querySelector(".fa-solid");

  icon.classList.remove("fa-stop");
  icon.classList.add("fa-play");
  gameBtn.style.visibility = "visible";

  updateTimerText(GAME_DURATION_SEC);
});

const game = new Game(12, 17, 10);
game.setGameStopListener((reason) => {
  console.log(reason);
});
