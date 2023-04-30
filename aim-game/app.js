const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timerEl = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;
let intervalId;

const menu = new Audio("./assets/menu.ogg");
menu.volume = 0.1;
const mouse = new Audio("./assets/mouse.ogg");
mouse.volume = 0.1;

document.addEventListener(
  "click",
  () => {
    menu.play();
    menu.loop = true;
    menu.autoplay = true;
  },
  { once: true }
);

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.dataset.time);
  }

  startGame();
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    e.target.remove();
    score++;

    playGunshotSound();
    checkMultiKill();
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add("up");
  intervalId = setInterval(decreaseTime, 1000);

  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let countdown = --time;
    if (countdown < 10) {
      countdown = `0${countdown}`;
    }

    setTime(countdown);
  }
}

function finishGame() {
  clearInterval(intervalId);
  timerEl.parentNode.classList.add("hide");
  board.innerHTML = `
    <h1>Score: <span class="primary">${score}</span></h1>
  `;

  const playAgainBtn = document.createElement("a");
  playAgainBtn.textContent = "Play again";
  playAgainBtn.onclick = function () {
    screens[1].classList.remove("up");
    timerEl.parentNode.classList.remove("hide");
    board.innerHTML = "";
    score = 0;

    playAgainBtn.remove();
  };

  timerEl.parentNode.insertAdjacentElement("afterbegin", playAgainBtn);
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.className = "circle";

  const circleSize = getRandomNum(10, 60);
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;

  const { width: boardSizeX, height: boardSizeY } =
    board.getBoundingClientRect();

  const coordX = getRandomNum(0, boardSizeX - circleSize);
  const coordY = getRandomNum(0, boardSizeY - circleSize);
  circle.style.top = `${coordX}px`;
  circle.style.left = `${coordY}px`;

  board.append(circle);
}

function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setTime(value) {
  timerEl.textContent = `00:${value}`;
}

function playGunshotSound() {
  let ak = new Audio("./assets/ak.ogg");
  ak.volume = 0.1;
  ak.play();
  ak = null;
}

function checkMultiKill() {
  let unrealSound = new Audio();
  unrealSound.volume = 0.1;

  switch (score) {
    case 1:
      unrealSound.src = "./assets/fb.ogg";
      break;
    case 2:
      unrealSound.src = "./assets/dbkill.ogg";
      break;
    case 5:
      unrealSound.src = "./assets/rampage.ogg";
      break;
    case 7:
      unrealSound.src = "./assets/megakill.ogg";
      break;
    case 10:
      unrealSound.src = "./assets/monster.ogg";
      break;
    case 15:
      unrealSound.src = "./assets/godlike.ogg";
      break;
  }

  unrealSound.play();
  unrealSound = null;
}
