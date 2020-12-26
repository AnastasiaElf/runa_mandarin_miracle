const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start");
const scene = document.getElementById("scene");
const background = document.getElementById("background");
const header = document.getElementById("header");
const character = document.getElementById("character");

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

function startGame() {
  character.style.top = `${INIT_Y}px`;
  character.classList.remove("hidden");

  window.onkeydown = (e) => {
    const key = e.code;
    const top = parseInt(character.style.top);

    switch (key) {
      case "ArrowUp":
        if (top > MIN_Y) {
          character.style.top = `${top - STEP}px`;
        }
        break;
      case "ArrowDown":
        if (top < MAX_Y) {
          character.style.top = `${top + STEP}px`;
        }
        break;

      default:
        break;
    }
  };

  let timer = setInterval(generateMandarins, 2000);
}

function generateMandarins() {
  if (isPageHidden) {
    return;
  }
  const mandarin = document.createElement("div");
  let rightPosition = -30;

  mandarin.classList.add("mandarin");
  const line = Math.floor(Math.random() * 5) - 2;
  mandarin.style.top = `${
    INIT_Y + STEP * line + CHARACTER_HEIGHT / 2 - MANDARIN_SIZE / 3
  }px`;
  mandarin.style.right = `${rightPosition}px`;

  scene.appendChild(mandarin);

  function moveMandarin() {
    if (isPageHidden) {
      return;
    }
    if (rightPosition > SCENE_WIDTH + MANDARIN_SIZE) {
      scene.removeChild(mandarin);
      clearInterval(timer);
      return;
    }
    rightPosition += 2;
    mandarin.style.right = `${rightPosition}px`;
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
  isPageHidden = document[pageHidden];
  if (isPageHidden) {
    background.style.animationPlayState = "paused";
  } else {
    background.style.animationPlayState = "running";
  }
}
