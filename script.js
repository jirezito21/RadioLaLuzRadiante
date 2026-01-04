const streamUrl = "https://TU_STREAM_AQUI";

const statusDiv = document.getElementById("live-status");
const audio = new Audio(streamUrl);

audio.addEventListener("canplay", () => {
  statusDiv.textContent = "🔴 EN VIVO";
  statusDiv.classList.remove("offline");
  statusDiv.classList.add("online");
});

audio.addEventListener("error", () => {
  statusDiv.textContent = "⚪ FUERA DE AIRE";
  statusDiv.classList.remove("online");
  statusDiv.classList.add("offline");
});
