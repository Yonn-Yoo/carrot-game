"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(1)
  .bugCount(20)
  .build();
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "You WON 🏆";
      sound.playWin();
      break;
    case Reason.lose:
      message = "You LOST 💩";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.isStarted = false;

  const icon = game.gameBtn.querySelector(".fa-solid");

  icon.classList.remove("fa-stop");
  icon.classList.add("fa-play");
  game.gameBtn.style.visibility = "visible";
});
