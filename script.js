const radio = document.getElementById("radio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");

playBtn.addEventListener("click", () => {
  radio.play();
});

pauseBtn.addEventListener("click", () => {
  radio.pause();
});
