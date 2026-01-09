//REFERENCIAS A ELEMENTOS DEL DOM
//Bloque de la Biblia
const bibleBlock = document.getElementById("bible-block");
//Bloque de Whatsapp
const whatsappBtn = document.getElementById("whatsappBtn");

//ESTADO GLOBAL DEL STREAM (FUENTE DE VERDAD)

//VARIABLES DE CONTROL

// LÓGICA DE VERSÍCULOS AUTOMÁTICOS
const verses = [
    { t: "Jesús les dijo: Yo soy la luz del mundo; el que me sigue, no andará en tinieblas.", r: "Juan 8:12" },
    { t: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", r: "Salmos 119:105" },
    { t: "Todo lo puedo en Cristo que me fortalece.", r: "Filipenses 4:13" },
    { t: "Jehová es mi pastor; nada me faltará.", r: "Salmos 23:1" },
    { t: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito...", r: "Juan 3:16" },
    { t: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", r: "Josué 1:9" },
    { t: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", r: "Mateo 11:28" }
];

function updateVerse() {
    // Desvanecer
    if(bibleBlock) {
        bibleBlock.style.opacity = 0;
        setTimeout(() => {
            const random = verses[Math.floor(Math.random() * verses.length)];
            bibleBlock.innerHTML = `“${random.t}”<span>${random.r}</span>`;
            // Reaparecer
            bibleBlock.style.opacity = 1;
        }, 500);
    }
}

// Configurar el cambio automático: 300,000 ms = 5 minutos
setInterval(updateVerse, 300000);

//ACTUALIZA ESTADO VISUAL (EN VIVO / PAUSADO)

//ACTUALIZA ESTADÍSTICAS (OYENTES / PAÍSES)

//BOTÓN PLAY / PAUSE (ÚNICO Y PROTEGIDO)

//CONTROL DE VOLUMEN (NO CONSUME DATOS EXTRA)

// Error de conexión con el stream

// SIMULACIÓN DE ESTADÍSTICAS (Luego será reemplazado por AzuraCast API)

// WHATSAPP AUTOMÁTICO SEGÚN ESTADO REAL
const WHATSAPP_NUMBER = "51991111228";
const RADIO_NAME = "Radio La Luz Radiante 101.3 FM";

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", e => {
    e.preventDefault();
    const msg = `📻 Hola, estoy escuchando ${RADIO_NAME} y quisiera contactarme con ustedes. 🙏`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
}

// 🔄 FORZAR ACTUALIZACIÓN SUAVE DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg) {
      reg.update();
    }
  });
}

// 📦 CARGAR VERSIÓN AUTOMÁTICA

// APP BAR FUNCIONAL (ESTABLE)

const appBar = document.querySelector(".app-bar");
if (appBar) {
  appBar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;

    switch (action) {
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "whatsapp":
        whatsappBtn.click();
        break;
    }
  });
}


