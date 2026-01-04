const radio = document.getElementById("radioPlayer");
const liveBtn = document.getElementById("liveBtn");
const liveStatus = document.getElementById("live-status");

const STREAM_URL = "https://icecast.radiofrance.fr/fip-midfi.mp3";

let isPlaying = false;

liveBtn.addEventListener("click", () => {
  if (!isPlaying) {
    radio.src = STREAM_URL;
    radio.load();
    radio.play();

    liveBtn.innerText = "⏸ PAUSAR";
    liveStatus.innerText = "🔴 EN VIVO";
    liveStatus.classList.remove("offline");
    liveStatus.classList.add("online");

    isPlaying = true;
  } else {
    radio.pause();

    liveBtn.innerText = "🔴 ESCUCHAR EN VIVO";
    liveStatus.innerText = "⚪ FUERA DE AIRE";
    liveStatus.classList.remove("online");
    liveStatus.classList.add("offline");

    isPlaying = false;
  }
});
