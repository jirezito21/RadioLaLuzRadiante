//REFERENCIAS A ELEMENTOS DEL DOM
const player = document.getElementById("radioPlayer");
const button = document.getElementById("liveButton");
const status = document.getElementById("live-status");
const volume = document.getElementById("volume");
const whatsappBtn = document.getElementById("whatsappBtn");

//ESTADO GLOBAL DEL STREAM (FUENTE DE VERDAD)
 
const STREAM = {
  isLive: false,     // ¿La radio está sonando?
  listeners: 0,      // Oyentes actuales
  countries: 0       // Países conectados
};

//VARIABLES DE CONTROL
let isPlaying = false;   // Estado real del audio
let userPaused = false; // Si el usuario pausó manualmente
let isBusy = false;     // Evita doble click rápido

 //ACTUALIZA ESTADO VISUAL (EN VIVO / PAUSADO)
function updateLiveStatus(isLive) {
  STREAM.isLive = isLive;
  document.body.classList.toggle("is-live", isLive)

  if (isLive) {
    status.textContent = "🔴 EN VIVO";
    status.classList.add("online");
    status.classList.remove("offline");
  } else {
    status.textContent = "⚪ PAUSADO";
    status.classList.remove("online");
    status.classList.add("offline");
  }
}

 //ACTUALIZA ESTADÍSTICAS (OYENTES / PAÍSES)
function updateStats(listeners, countries) {
  STREAM.listeners = listeners;
  STREAM.countries = countries;

  document.getElementById("listeners").textContent = listeners;
  document.getElementById("countries").textContent = countries;
}

 //BOTÓN PLAY / PAUSE (ÚNICO Y PROTEGIDO)
 
button.addEventListener("click", async () => {
  if (isBusy) return;     // Evita doble toque
  isBusy = true;

  try {
    if (!isPlaying) {
      userPaused = false;
      await player.play();
    } else {
      userPaused = true;
      player.pause();
    }
  } catch {
    status.textContent = "⚠️ Toca para reproducir";
  } finally {
    setTimeout(() => (isBusy = false), 500);
  }
});

//CONTROL DE VOLUMEN (NO CONSUME DATOS EXTRA)
 
volume.addEventListener("input", () => {
  player.volume = volume.value;
});
player.volume = volume.value;

//EVENTOS REALES DEL AUDIO (LA VERDAD MANDA)

// Cuando el audio realmente empieza
player.addEventListener("play", () => {
  if (userPaused) return;

  isPlaying = true;
  updateLiveStatus(true);

  button.textContent = "⏸ PAUSAR RADIO";
  button.classList.add("playing");
});

// Cuando el audio se pausa
player.addEventListener("pause", () => {
  isPlaying = false;
  updateLiveStatus(false);

  button.textContent = "🎧 ESCUCHAR EN VIVO";
  button.classList.remove("playing");
});

// Error de conexión con el stream
player.addEventListener("error", () => {
  isPlaying = false;
  updateLiveStatus(false);

  status.textContent = "⚠️ ERROR DE CONEXIÓN";
  button.textContent = "🎧 ESCUCHAR EN VIVO";
  button.classList.remove("playing");
});

// SIMULACIÓN DE ESTADÍSTICAS (Luego será reemplazado por AzuraCast API)
const listeners = Math.floor(Math.random() * 50) + 10;
const countries = Math.floor(Math.random() * 5) + 1;
updateStats(listeners, countries);


 // WHATSAPP AUTOMÁTICO SEGÚN ESTADO REAL
 
const WHATSAPP_NUMBER = "51918215902";
const RADIO_NAME = "Radio La Luz Radiante 101.3 FM";

function getWhatsAppMessage() {
  return STREAM.isLive
    ? `📻 Estoy escuchando ${RADIO_NAME} EN VIVO 🙏`
    : `🙏 Quisiera más información sobre ${RADIO_NAME}`;
}

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", e => {
    e.preventDefault();
    const msg = getWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
}


 /*AZURACAST (DESACTIVADO POR AHORA)
 
fetch("https://tu-azuracast/api/nowplaying/radio")
  .then(r => r.json())
  .then(data => {
    updateLiveStatus(data.live.is_live);
    updateStats(
      data.listeners.current,
      data.listeners.unique
    );
  });
*/
