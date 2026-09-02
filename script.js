let score = 0;
let lives = 3;
let gameInterval;
let isGameActive = false;

const gameScreen = document.getElementById("gameScreen");

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  gameScreen.classList.remove("hidden");

  score = 0;
  lives = 3;
  isGameActive = true;

  updateUI();

  gameInterval = setInterval(createStar, 1000);
}

function createStar() {
  if (!isGameActive) return;

  const star = document.createElement("div");
  star.innerText = "⭐";
  star.classList.add("star");

  let x = Math.random() * (window.innerWidth - 50);
  star.style.left = x + "px";
  star.style.top = "0px";

  gameScreen.appendChild(star);

  let fallInterval = setInterval(() => {
    let top = parseInt(star.style.top);
    if (top > window.innerHeight) {
      clearInterval(fallInterval);
      star.remove();
      lives--;
      updateUI();
      if (lives === 0) endGame();
    }
    star.style.top = top + 5 + "px";
  }, 50);

  star.addEventListener("click", () => {
    score += 10;
    updateUI();
    star.remove();
    clearInterval(fallInterval);
  });
}

function updateUI() {
  document.getElementById("score").innerText = score;
  document.getElementById("lives").innerText = lives;
}

function endGame() {
  isGameActive = false;
  clearInterval(gameInterval);
  gameScreen.classList.add("hidden");
  document.getElementById("gameOverScreen").classList.remove("hidden");
  document.getElementById("finalScore").innerText = score;
}

function restartGame() {
  document.getElementById("gameOverScreen").classList.add("hidden");
  startGame();
}
