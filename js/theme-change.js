const themeToggleBtn = document.querySelector(".theme-change");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
