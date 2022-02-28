export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      seconds: root.querySelector(".timer__part-seconds"),
      milliseconds: root.querySelector(".timer__part-milliseconds"),
    };

    this.interval = null;
    this.remainingSeconds = 90;

    this.updateInterfaceTime();

    playBtn.addEventListener("click", () => {
      // TODO: add in the code
    });
  }

  updateInterfaceTime() {
    const seconds = Math.floor(this.remainingSeconds);
    const milliseconds = this.remainingSeconds % 1;

    console.log(seconds, milliseconds);
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    this.el.milliseconds.textContent = milliseconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `
    <button type="button" class="play__btn">
      <i class="fa-solid fa-play play__icon"></i>
    </button>`;
    }
  }

  static getHTML() {
    return `
  <span class="timer__part timer__part-seconds">00</span>
  <span class="timer__part">:</span>
  <span class="timer__part timer__part-milliseconds">00</span>
  `;
  }
}

const playBtn = document.querySelector(".play__btn");
