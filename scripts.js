const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start");
const scene = document.getElementById("scene");
const background = document.getElementById("background");
const header = document.getElementById("header");
const character = document.getElementById("character");
const pop = document.getElementById("pop");
const totalScore = document.getElementById("score");

startButton.addEventListener("click", (e) => {
  welcomeScreen.classList.add("hidden");
  scene.classList.remove("hidden");
  header.classList.remove("hidden");
  startGame();
});

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 400;
const CHARACTER_HEIGHT = 70;
const MANDARIN_SIZE = 30;
const STEP = CHARACTER_HEIGHT;
const INIT_Y = 400 / 2 - CHARACTER_HEIGHT / 2;
const MAX_Y = INIT_Y + STEP * 2;
const MIN_Y = INIT_Y - STEP * 2;
const CHARACTER_START_X = 50;
const CHARACTER_END_X = 115;

const SCORE_TO_WIN = 100;

let score = 0;
let characterLine = 0;
let isWin = false;

let mandarinGenerationTimer;

function startGame() {
  character.style.top = `${INIT_Y}px`;
  character.classList.remove("hidden");

  window.onkeydown = (e) => {
    const key = e.code;
    const top = parseInt(character.style.top);

    switch (key) {
      case "ArrowUp":
        if (top > MIN_Y) {
          characterLine -= 1;
          character.style.top = `${top - STEP}px`;
        }
        break;
      case "ArrowDown":
        if (top < MAX_Y) {
          characterLine += 1;
          character.style.top = `${top + STEP}px`;
        }
        break;

      default:
        break;
    }
  };

  mandarinGenerationTimer = setInterval(generateMandarins, 2000);
}

function generateMandarins() {
  if (isPageHidden || isWin) {
    return;
  }
  const mandarin = document.createElement("div");
  let leftPosition = SCENE_WIDTH + 30;
  const line = Math.floor(Math.random() * 5) - 2;
  let topPosition =
    INIT_Y + STEP * line + CHARACTER_HEIGHT / 2 - MANDARIN_SIZE / 3;

  mandarin.classList.add("mandarin");
  mandarin.style.top = `${topPosition}px`;
  mandarin.style.left = `${leftPosition}px`;
  scene.appendChild(mandarin);

  function moveMandarin() {
    if (isPageHidden) {
      return;
    }
    if (leftPosition < -MANDARIN_SIZE || isWin) {
      scene.removeChild(mandarin);
      clearInterval(timer);
      return;
    }
    leftPosition -= 2;
    mandarin.style.left = `${leftPosition}px`;

    if (
      leftPosition > CHARACTER_START_X &&
      leftPosition < CHARACTER_END_X &&
      characterLine === line
    ) {
      pop.play();
      score += 1;
      totalScore.innerText = score;
      scene.removeChild(mandarin);
      clearInterval(timer);
      character.style.filter = `grayscale(${100 - score}%)`;
      if (score === SCORE_TO_WIN) {
        onWin();
      }
      return;
    }
  }

  let timer = setInterval(moveMandarin, 20);
}

let isPageHidden = false;
let pageHidden, visibilityChange;

if (typeof document.hidden !== "undefined") {
  pageHidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  pageHidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  pageHidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

function handleVisibilityChange() {
  if (isWin) {
    return;
  }
  isPageHidden = document[pageHidden];
  if (isPageHidden) {
    background.style.animationPlayState = "paused";
  } else {
    background.style.animationPlayState = "running";
  }
}

function onWin() {
  isWin = true;
  scene.removeChild(character);
  background.style.animationPlayState = "paused";
  clearInterval(mandarinGenerationTimer);
}
