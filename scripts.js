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

function startGame() {
  character.classList.remove("hidden");
}
