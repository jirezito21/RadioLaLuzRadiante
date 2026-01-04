const player = document.getElementById("radioPlayer");
const button = document.getElementById("liveButton");
const status = document.getElementById("live-status");
const volume = document.getElementById("volume");

let isPlaying = false;

// BOTÓN PLAY / PAUSE
button.addEventListener("click", () => {
  if (!isPlaying) {
    player.play();
    isPlaying = true;

    button.textContent = "⏸ PAUSAR RADIO";
    button.classList.add("playing");

    status.textContent = "🔴 EN VIVO";
    status.classList.remove("offline");
    status.classList.add("online");
  } else {
    player.pause();
    isPlaying = false;

    button.textContent = "🎧 ESCUCHAR EN VIVO";
    button.classList.remove("playing");

    status.textContent = "⚪ PAUSADO";
    status.classList.remove("online");
    status.classList.add("offline");
  }
});

// CONTROL DE VOLUMEN
volume.addEventListener("input", () => {
  player.volume = volume.value;
});
