const welcomeScreen = document.getElementById("welcome");
const startButton = document.getElementById("start");
const scene = document.getElementById("scene");
const header = document.getElementById("header");
const character = document.getElementById("character");

startButton.addEventListener("click", (e) => {
  welcomeScreen.classList.add("hidden");
  scene.classList.remove("hidden");
  header.classList.remove("hidden");
  startGame();
});

const SCENE_HEIGHT = 400;
const CHARACTER_HEIGHT = 70;
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
}
