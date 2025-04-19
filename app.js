function mostrarEjercicios(tipo) {
  const contenido = document.getElementById("contenido");

  if (tipo === "virtual") {
  contenido.innerHTML = `
    <h2>Ejercicios Virtuales (Motricidad fina)</h2>
    <p>Selecciona un tipo de juego para comenzar:</p>
    <ul>
      <li><button onclick="juego('camino')">🧠 Sigue el camino</button></li>
      <li><button onclick="juego('reaccion')">⚡ Reacción Rápida</button></li>
    </ul>
  `;
  } else if (tipo === "no-virtual") {
    contenido.innerHTML = `
      <h2>Ejercicios Físicos</h2>
      <div class="options">
        <button onclick="mostrarMotricidad('fina')">Motricidad Fina</button>
        <button onclick="mostrarMotricidad('gruesa')">Motricidad Gruesa</button>
      </div>
      <div id="subcontenido"></div>
    `;
  }
}

function mostrarMotricidad(tipo) {
  const subcontenido = document.getElementById("subcontenido");

  if (tipo === "gruesa") {
    subcontenido.innerHTML = `
      <h3>Ejercicios de Motricidad Gruesa</h3>
      <ul>
        <li>🏃 Caminar en línea recta con los ojos cerrados</li>
        <li>🦶 Saltar en un pie y luego en el otro</li>
            <li>⚽ Atrapa y esquiva la pelota</li>
        <li>📦 Levanta objetos del suelo</li>
        <li>🚧 Esquiva obstáculos</li>
        <li>🧘 Haz ejercicios de equilibrio</li>
        <li>🧘‍♀️ Practica Yoga</li>
        <li>🗃️ Apila cajas</li>
        <li>🔁 Reincorpórate (siéntate y párate repetidamente)</li>
        <li>💃 Baila</li>
        <li>🏃 Corre</li>
        <li>🏋️ Ve al gimnasio</li>
        <li>🏅 Practica un deporte:</li>
        <ul>
          <li>🏊 Natación</li>
          <li>⚽ Fútbol</li>
          <li>🏀 Baloncesto</li>
          <li>🏐 Voleibol</li>
          <li>🏃‍♂️ Atletismo</li>
          <li>🥋 Artes marciales</li>
          <li>🎾 Tenis</li>
          <li>🥎 Padel</li>
          <li>🏈 Fútbol americano</li>
          <li>🎯 Otros deportes</li>
      </ul>
    </ul>
      </ul>
    `;
  } else if (tipo === "fina") {
    subcontenido.innerHTML = `
      <h3>Ejercicios de Motricidad Fina</h3>
      <ul>
        <li>🖐 Toca cada dedo con el pulgar (mano derecha y luego izquierda)</li>
        <li>✏️ Traza líneas con un lápiz entre dos puntos sin salirse</li>
        <li>📄 Realiza figuras en Origami</li>
        <li>✂️ Recorta papel con tijeras en forma de tu figura favorita</li>
        <li>🎨 Haz figuras con plastilina</li>
        <li>🪡 Enhebra algunas agujas</li>
        <li>🧊 Arma un cubo Rubik</li>
        <li>🖍️ Pinta o colorea tu dibujo preferido</li>
        <li>🫙 Haz figuras con arcilla</li>
        <li>🧩 Arma un rompecabezas</li>
        <li>🏗️ Juega Jenga</li>
        <li>🖐️ Recoge objetos pequeños con tus manos en forma de pinza</li>
        <li>🧱 Arma una estructura con bloques (como Lego)</li>
        <li>🧁 Realiza un pastel o muffin de tu gusto</li>
        <li>🌀 Juega Twister</li>
        <li>🧠 Juega a encajar figuras en el orificio con su misma forma</li>
        <li>🪙 Inserta botones en agujeros pequeños (como una alcancía)</li>
        <li>🎲 Juega otros juegos de mesa</li>
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
  } else if (tipo === 'reaccion') {
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `
      <div id="juegoReaccion">
        <h2>⚡ Reacción Rápida</h2>
        <p>Haz clic tan pronto como veas el cambio de color.</p>
        <div id="pantallaReaccion" style="width:100%; height:300px; background-color:lightgray; margin-top:20px; display:flex; align-items:center; justify-content:center; font-size:1.5em; border-radius:10px; cursor:pointer;">
          Presiona para comenzar
        </div>
        <button onclick="volverAlMenu()" style="margin-top:20px;">Volver al menú</button>
      </div>
    `;
    iniciarReaccionContinua();
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

let reaccionTimeout, esperando = false, tiempoInicio, juegoActivo = false;

function iniciarReaccionContinua() {
  const pantalla = document.getElementById("pantallaReaccion");
  pantalla.style.backgroundColor = "lightgray";
  pantalla.textContent = "Presiona para comenzar";
  esperando = false;
  juegoActivo = false;

  pantalla.onclick = () => {
    if (!esperando && !juegoActivo) {
      juegoActivo = true;
      comenzarCiclo();
    } else if (esperando) {
      const ahora = new Date().getTime();
      const tiempoReaccion = ahora - tiempoInicio;

      pantalla.textContent = `⏱️ ${tiempoReaccion} ms`;
      pantalla.style.backgroundColor = "#2196F3"; // Azul

      esperando = false;

      setTimeout(() => {
        comenzarCiclo();
      }, 1000);
    }
  };
}

function comenzarCiclo() {
  const pantalla = document.getElementById("pantallaReaccion");

  // Cancelar timeout anterior si existe
  if (reaccionTimeout) {
    clearTimeout(reaccionTimeout);
    reaccionTimeout = null;
  }

  pantalla.textContent = "Espera...";
  pantalla.style.backgroundColor = "lightgray";
  esperando = false;

  const delay = Math.floor(Math.random() * 3000) + 2000;

  reaccionTimeout = setTimeout(() => {
    pantalla.style.backgroundColor = "#4CAF50";
    pantalla.textContent = "¡Haz clic ahora!";
    tiempoInicio = new Date().getTime();
    esperando = true;
  }, delay);
}

function volverAlMenu() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Ejercicios de Motricidad</h1>
    <p>¿Cómo deseas practicar hoy?</p>
    <div class="options">
      <button onclick="mostrarEjercicios('virtual')">Ejercicios Virtuales (Motricidad fina)</button>
      <button onclick="mostrarEjercicios('no-virtual')">Ejercicios Físicos</button>
    </div>
    <div id="contenido"></div>
  `;
}

document.addEventListener("DOMContentLoaded", volverAlMenu);