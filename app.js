function mostrarEjercicios(tipo) {
  const contenido = document.getElementById("contenido");

  if (tipo === "virtual") {
    contenido.innerHTML = `
      <h2>Ejercicios Virtuales (Motricidad fina)</h2>
      <p>Selecciona un tipo de juego para comenzar:</p>
      <ul>
        <li><button onclick="juego('camino')">Sigue el camino</button></li>
      </ul>
    `;
  } else if (tipo === "fisicos") {
    contenido.innerHTML = `
      <h2>Ejercicios Físicos</h2>
      <div class="options">
        <button onclick="mostrarEjerciciosFisicos('fina')">Motricidad Fina</button>
        <button onclick="mostrarEjerciciosFisicos('gruesa')">Motricidad Gruesa</button>
      </div>
      <div id="subcontenido"></div>
    `;
  }
}

function mostrarEjerciciosFisicos(tipo) {
  const subcontenido = document.getElementById("subcontenido");

  if (tipo === "gruesa") {
    subcontenido.innerHTML = `
      <h3>Ejercicios de Motricidad Gruesa</h3>
      <ul>
        <li>🏃 Caminar en línea recta con los ojos cerrados</li>
        <li>🦶 Saltar en un pie y luego en el otro</li>
      </ul>
    `;
  } else if (tipo === "fina") {
    subcontenido.innerHTML = `
      <h3>Ejercicios de Motricidad Fina</h3>
      <ul>
        <li>🖐 Tocar cada dedo con el pulgar (mano derecha y luego izquierda)</li>
        <li>✏️ Trazar líneas con un lápiz entre dos puntos sin salirse</li>
      </ul>
    `;
  }
}

function juego(tipo) {
  if (tipo === 'camino') {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
      <div id="juegoCamino">
        <h2>Nivel <span id="nivel">1</span>: Sigue el camino</h2>
        <div id="caminoContainer">
          <canvas id="caminoCanvas" width="360" height="500"></canvas>
        </div>
        <p id="mensaje"></p>
        <button id="volverMenu" onclick="volverAlMenu()">Volver al menú</button>
      </div>
    `;
    iniciarJuegoCamino();
  }
}

function iniciarJuegoCamino() {
  const canvas = document.getElementById("caminoCanvas");
  const ctx = canvas.getContext("2d");
  const mensaje = document.getElementById("mensaje");
  const nivelTexto = document.getElementById("nivel");

  let nivelActual = 1;
  let dentroDelCamino = false;
  let inicioAlcanzado = false;

  const niveles = [
    // Nivel 1: línea recta
    (ctx) => { ctx.beginPath(); ctx.moveTo(50, 50); ctx.lineTo(310, 450); },

    // Nivel 2: curva en S
    (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.quadraticCurveTo(180, 200, 50, 350);
      ctx.quadraticCurveTo(180, 500, 310, 350);
    },

    // Nivel 3: curva tipo "rizo"
    (ctx) => { ctx.beginPath(); ctx.moveTo(50, 450); ctx.bezierCurveTo(100, 100, 260, 400, 310, 50); },

    // Nivel 4: zigzag en escalera
    (ctx) => {
      ctx.beginPath();
      ctx.moveTo(50, 100);
      ctx.lineTo(150, 200);
      ctx.lineTo(50, 300);
      ctx.lineTo(150, 400);
      ctx.lineTo(310, 450);
    },

    // Nivel 5: curva cerrada de precisión
    (ctx) => { ctx.beginPath(); ctx.moveTo(50, 250); ctx.quadraticCurveTo(180, 0, 310, 250); },
  ];

  const puntosIniciales = [
    { x: 50, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: 450 },
    { x: 50, y: 100 },
    { x: 50, y: 250 },
  ];

  const puntosFinales = [
    { x: 310, y: 450 },
    { x: 310, y: 350 },
    { x: 310, y: 50 },
    { x: 310, y: 450 },
    { x: 310, y: 250 },
  ];

  function dibujarNivel(nivel) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 20 - nivel * 2;
    ctx.strokeStyle = "#4CAF50";
    niveles[nivel - 1](ctx);
    ctx.stroke();

    // Punto inicial (azul)
    const ini = puntosIniciales[nivel - 1];
    ctx.beginPath();
    ctx.arc(ini.x, ini.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Punto final (rojo)
    const fin = puntosFinales[nivel - 1];
    ctx.beginPath();
    ctx.arc(fin.x, fin.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  function verificarColision(x, y) {
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return pixel[0] === 76 && pixel[1] === 175 && pixel[2] === 80;
  }

  function manejarMovimiento(evt) {
    const rect = canvas.getBoundingClientRect();
    const x = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
    const y = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;

    const ini = puntosIniciales[nivelActual - 1];
    const fin = puntosFinales[nivelActual - 1];
    const distanciaInicio = Math.hypot(x - ini.x, y - ini.y);
    const distanciaFin = Math.hypot(x - fin.x, y - fin.y);

    // Detectar inicio
    if (distanciaInicio < 12) {
      inicioAlcanzado = true;
      dentroDelCamino = true;
      mensaje.textContent = "¡Bien! Comenzaste correctamente.";
      mensaje.style.color = "blue";
      return;
    }

    if (!inicioAlcanzado) {
      mensaje.textContent = "Debes comenzar desde el punto azul.";
      return;
    }

    // Detectar final
    if (distanciaFin < 12 && dentroDelCamino) {
      nivelActual++;
      inicioAlcanzado = false;
      dentroDelCamino = false;

      if (nivelActual > niveles.length) {
        mensaje.style.color = "green";
        mensaje.textContent = "¡Felicidades! Completaste todos los niveles 🎉";
        canvas.removeEventListener("mousemove", manejarMovimiento);
        canvas.removeEventListener("touchmove", manejarMovimiento);
      } else {
        nivelTexto.textContent = nivelActual;
        mensaje.style.color = "black";
        mensaje.textContent = "";
        dibujarNivel(nivelActual);
      }
      return;
    }

    // Verificar si sigue en el camino
    if (verificarColision(x, y)) {
      dentroDelCamino = true;
    } else if (dentroDelCamino) {
      mensaje.style.color = "red";
      mensaje.textContent = "¡Ups! Te saliste. Inténtalo de nuevo.";
      inicioAlcanzado = false;
      dentroDelCamino = false;
      dibujarNivel(nivelActual);
    }
  }

  dibujarNivel(nivelActual);
  canvas.addEventListener("mousemove", manejarMovimiento);
  canvas.addEventListener("touchmove", manejarMovimiento, { passive: true });
}

function volverAlMenu() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Ejercicios de Motricidad</h1>
    <p>¿Cómo deseas practicar hoy?</p>
    <div class="options">
      <button onclick="mostrarEjercicios('virtual')">Ejercicios Virtuales (Motricidad fina)</button>
      <button onclick="mostrarEjercicios('fisicos')">Ejercicios Físicos</button>
    </div>
    <div id="contenido"></div>
  `;
}

document.addEventListener("DOMContentLoaded", volverAlMenu);