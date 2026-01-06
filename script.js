const player = document.getElementById("radioPlayer");
const button = document.getElementById("liveButton");
const status = document.getElementById("live-status");
const volume = document.getElementById("volume");

let isPlaying = false;
let userPaused = false;

// BOTÓN PLAY / PAUSE
button.addEventListener("click", () => {
    if (!isPlaying) {
        userPaused = false;
        player.play().catch(() => {
            status.textContent = "⚠️ Toca para reproducir";
        });
    } else {
        userPaused = true;
        player.pause();
    }
});


// CONTROL DE VOLUMEN
volume.addEventListener("input", () => {
    player.volume = volume.value;
});

player.volume = volume.value;

// ================================
// ESTADO REAL DEL AUDIO (IMPORTANTE)
// ================================

// Cuando el audio realmente empieza
player.addEventListener("play", () => {
    if (userPaused) return;

    isPlaying = true;
    streamStatus = "live";

    button.textContent = "⏸ PAUSAR RADIO";
    button.classList.add("playing");

    status.textContent = "🔴 EN VIVO";
    status.classList.remove("offline");
    status.classList.add("online");
});

// Cuando el audio se pausa o se corta
player.addEventListener("pause", () => {
    isPlaying = false;
    streamStatus = "paused";

    button.textContent = "🎧 ESCUCHAR EN VIVO";
    button.classList.remove("playing");

    status.textContent = "⚪ PAUSADO";
    status.classList.remove("online");
    status.classList.add("offline");
});

// Cuando hay error de conexión
player.addEventListener("error", () => {
    isPlaying = false;
    streamStatus = "offline";
    
    status.textContent = "⚠️ ERROR DE CONEXIÓN";
    status.classList.remove("online");
    status.classList.add("offline");
});


// SIMULACIÓN (luego AzuraCast lo reemplaza)
const listeners = Math.floor(Math.random() * 50) + 10;
const countries = Math.floor(Math.random() * 5) + 1;

const listenersEl = document.getElementById("listeners");
const countriesEl = document.getElementById("countries");

if (listenersEl && countriesEl) {
    listenersEl.textContent = listeners;
    countriesEl.textContent = countries;
}

window.getStreamStatus = () => (isPlaying ? "live" : "offline");

// ================================
// WHATSAPP AUTOMÁTICO (ESTADO REAL)
// ================================

const WHATSAPP_NUMBER = "51918215902";
const RADIO_NAME = "Radio La Luz Radiante 101.3 FM";

let streamStatus = "offline"; // live | paused | offline

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let message = "";

    switch (streamStatus) {
      case "live":
        message = `📻 Estoy escuchando ${RADIO_NAME} EN VIVO. Bendiciones 🙏`;
        break;

      case "paused":
        message = `🎧 Estoy escuchando ${RADIO_NAME}, pero ahora está en pausa.`;
        break;

      default:
        message = `🙏 Quisiera más información sobre ${RADIO_NAME}`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}
