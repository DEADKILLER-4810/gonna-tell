const btn = document.getElementsByClassName("btn")[0]; // take the first element

btn.addEventListener("click", () => {
  const maxX = window.innerWidth - btn.offsetWidth;
  const maxY = window.innerHeight - btn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  btn.style.position = "absolute";
  btn.style.left = randomX + "px";
  btn.style.top = randomY + "px";
});
