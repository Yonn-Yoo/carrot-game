"use strict";

const carrot_size = 80;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initGame() {
  // 벌레와 당근을 생성한 뒤 필드에 추가해줌
  console.log(fieldRect);
  addItem("carrot", 5, "/img/carrot.png");
  addItem("bug", 5, "/img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrot_size;
  const y2 = fieldRect.height - carrot_size;
  // 민경이 바보
  // 미녕이 똥꼬
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

initGame();
