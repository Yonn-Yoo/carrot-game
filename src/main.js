"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();

const game = new Game(12, 17, 10);
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay❓";
      break;
    case "win":
      message = "You WON 🏆";
      break;
    case "lose":
      message = "You LOST 💩";
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
