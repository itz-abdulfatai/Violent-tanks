let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;

function updateHighestScore() {
  (function renderHighestScore() {
    const highestScoreDisplay = document.querySelector(".highest-score");
    highestScoreDisplay.innerHTML = highestScore;
  })();
}

// set interval
window.addEventListener("load", () => {
  updateHighestScore();
});
