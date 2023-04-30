"use string";

const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const sidebar = document.querySelector(".sidebar");
const mainSlide = document.querySelector(".main-slide");
const slidesCount = mainSlide.querySelectorAll(".main-slide__item").length;

let activeSlideIndex = 0;
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener("click", () => {
  changeSlide("up");
});

downBtn.addEventListener("click", () => {
  changeSlide("down");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    changeSlide("down");
  }

  if (e.key === "ArrowUp") {
    changeSlide("up");
  }
});

function changeSlide(direction) {
  if (direction === "up") {
    activeSlideIndex++;

    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  }

  if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }

  mainSlide.style.transform = `translateY(-${activeSlideIndex * 100}vh)`;
  sidebar.style.transform = `translateY(${activeSlideIndex * 100}vh)`;
}
