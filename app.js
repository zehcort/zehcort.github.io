function mostrarEjercicios(tipo) {
  const contenido = document.getElementById("contenido");

  if (tipo === "virtual") {
  contenido.innerHTML = `
    <h2>Ejercicios Virtuales (Motricidad fina)</h2>
    <p>Selecciona un tipo de juego para comenzar:</p>
    <div class="options">
      <button onclick="juego('camino')">🧠 Sigue el camino</button>
      <button onclick="juego('reaccion')">⚡ Reacción Rápida</button>
      <button onclick="juego('unirPuntos')">🔗 Une los Puntos</button>
    </div>
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
  } else if (tipo === 'unirPuntos') {
    contenido.innerHTML = `
      <div id="juegoUnirPuntos">
        <h2>🔗 Une los Puntos</h2>
        <div id="contenedorSVG" style="width:100%; max-width:400px; height:400px; margin:auto;"></div>
        <p id="mensajeUnir" style="text-align:center; font-weight:bold;"></p>
        <button onclick="volverAlMenu()" style="margin-top:20px;">Volver al menú</button>
      </div>
    `;
    iniciarUnirPuntos();
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

let reaccionTimeout, esperando = false, tiempoInicio, juegoActivo = false, puedeReaccionar = false;

function iniciarReaccionContinua() {
  const pantalla = document.getElementById("pantallaReaccion");
  pantalla.style.backgroundColor = "lightgray";
  pantalla.textContent = "Presiona para comenzar";
  esperando = false;
  juegoActivo = false;
  puedeReaccionar = false;

  pantalla.onclick = () => {
    if (!esperando && !juegoActivo) {
      juegoActivo = true;
      comenzarCiclo();
    } else if (esperando && puedeReaccionar) {
      // Reacción correcta
      const ahora = new Date().getTime();
      const tiempoReaccion = ahora - tiempoInicio;

      pantalla.textContent = `⏱️ ${tiempoReaccion} ms`;
      pantalla.style.backgroundColor = "#2196F3"; // Azul

      esperando = false;
      puedeReaccionar = false;

      setTimeout(() => {
        comenzarCiclo();
      }, 1500);
    } else if (!puedeReaccionar && juegoActivo) {
      // Clic antes de tiempo
      clearTimeout(reaccionTimeout);
      pantalla.style.backgroundColor = "#ff4d4d"; // Rojo
      pantalla.style.color = "white";
      pantalla.textContent = "¡Muy pronto! 😅";

      esperando = false;

      setTimeout(() => {
        pantalla.style.color = ""; // restaurar color
        comenzarCiclo();
      }, 2000);
    }
  };
}

function comenzarCiclo() {
  const pantalla = document.getElementById("pantallaReaccion");

  if (reaccionTimeout) {
    clearTimeout(reaccionTimeout);
    reaccionTimeout = null;
  }

  pantalla.textContent = "Espera...";
  pantalla.style.backgroundColor = "lightgray";
  esperando = false;
  puedeReaccionar = false;

  const delay = Math.random() * (4000 - 1500) + 1500;

  reaccionTimeout = setTimeout(() => {
    pantalla.style.backgroundColor = "#4CAF50";
    pantalla.textContent = "¡Haz clic ahora!";
    tiempoInicio = new Date().getTime();
    esperando = true;
    puedeReaccionar = true;
  }, delay);
}

function iniciarUnirPuntos() {
  const svgContainer = document.getElementById("contenedorSVG");
  const mensaje = document.getElementById("mensajeUnir");

  // Mostrar instrucciones solo si no existen
  const instruccionesId = "instruccionesUnir";
  if (!document.getElementById(instruccionesId)) {
    const instrucciones = document.createElement("div");
    instrucciones.id = instruccionesId;
    instrucciones.style.textAlign = "center";
    instrucciones.style.marginBottom = "10px";

    const textoNivel = document.createElement("p");
    textoNivel.id = "textoNivel";
    textoNivel.style.margin = "0";
    textoNivel.style.fontWeight = "bold";

    const textoInstrucciones = document.createElement("p");
    textoInstrucciones.style.margin = "0";
    textoInstrucciones.textContent = "🧠 Une los puntos en orden (1 → 2 → 3...) y termina regresando al punto 1";

    instrucciones.appendChild(textoNivel);
    instrucciones.appendChild(textoInstrucciones);
    svgContainer.parentNode.insertBefore(instrucciones, svgContainer);
  }

  let nivel = 1;
  const nivelMax = 5;

  function generarPuntosAleatorios(cantidad) {
    const puntos = [];
    const distanciaMinima = 30;

    for (let i = 0; i < cantidad; i++) {
      let valido = false;
      let x, y;

      while (!valido) {
        x = 50 + Math.random() * 300;
        y = 50 + Math.random() * 300;

        valido = true;
        for (const [px, py] of puntos) {
          const distancia = Math.hypot(x - px, y - py);
          if (distancia < distanciaMinima) {
            valido = false;
            break;
          }
        }
      }

      puntos.push([x, y]);
    }

    return puntos;
  }

  function dibujarNivel() {
    const puntosPorNivel = [5, 8, 12, 15, 20];
    const cantidadPuntos = puntosPorNivel[nivel - 1];
    const puntos = generarPuntosAleatorios(cantidadPuntos);

    document.getElementById("textoNivel").textContent = `Nivel ${nivel}`;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.style.background = "#f9f9f9";

    svgContainer.innerHTML = "";
    svgContainer.appendChild(svg);

    const circles = [];
    const texts = [];


    puntos.forEach((p, i) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", p[0]);
      circle.setAttribute("cy", p[1]);
      circle.setAttribute("r", 10);
      circle.setAttribute("fill", "#2196F3");
      circle.setAttribute("data-index", i + 1);
      circles.push(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", p[0]);
      text.setAttribute("y", p[1] + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", "#fff");
      text.setAttribute("pointer-events", "none");
      text.style.userSelect = "none";
      text.textContent = i + 1;
      texts.push(text);
    });

    circles.forEach(c => svg.appendChild(c));
    texts.forEach(t => svg.appendChild(t));

    let actual = 0;
    let linea = null;

    svg.addEventListener("pointerdown", function(e) {
      const target = e.target;
      if (target.tagName === "circle" && +target.getAttribute("data-index") === actual + 1) {
        const cx = +target.getAttribute("cx");
        const cy = +target.getAttribute("cy");

        linea = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        linea.setAttribute("fill", "none");
        linea.setAttribute("stroke", "#4CAF50");
        linea.setAttribute("stroke-width", 4);
        linea.points.appendItem(svg.createSVGPoint());
        linea.points[0].x = cx;
        linea.points[0].y = cy;

        svg.appendChild(linea);

        function mover(e) {
          const pt = svg.createSVGPoint();
          pt.x = e.clientX || e.touches?.[0].clientX;
          pt.y = e.clientY || e.touches?.[0].clientY;
          const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

          if (linea.points.length === 1) {
            linea.points.appendItem(svg.createSVGPoint());
          }
          linea.points[1].x = svgP.x;
          linea.points[1].y = svgP.y;
        }

        function soltar(e) {
          svg.removeEventListener("pointermove", mover);
          svg.removeEventListener("pointerup", soltar);

          let siguienteIndex = actual + 2;
          const siguiente = svg.querySelector(`circle[data-index="${siguienteIndex}"]`);

          if (!siguiente && actual === puntos.length - 1) {
            const primer = svg.querySelector(`circle[data-index="1"]`);
            const dx = primer.cx.baseVal.value - linea.points[1].x;
            const dy = primer.cy.baseVal.value - linea.points[1].y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 20) {
              mensaje.textContent = "✅ Nivel completado";
              nivel++;
              if (nivel > nivelMax) {
                mensaje.textContent = "🎉 ¡Felicidades! Completaste todos los niveles.";
              } else {
                setTimeout(() => {
                  mensaje.textContent = "";
                  dibujarNivel();
                }, 1000);
              }
            } else {
              mensaje.textContent = "❌ Termina regresando al punto 1";
              setTimeout(() => {
                mensaje.textContent = "";
                dibujarNivel();
              }, 1000);
            }
            return;
          }

          if (siguiente) {
            const dx = siguiente.cx.baseVal.value - linea.points[1].x;
            const dy = siguiente.cy.baseVal.value - linea.points[1].y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 20) {
              actual++;
              linea.points[1].x = siguiente.cx.baseVal.value;
              linea.points[1].y = siguiente.cy.baseVal.value;
            } else {
              mensaje.textContent = "❌ Intenta de nuevo";
              setTimeout(() => {
                mensaje.textContent = "";
                dibujarNivel();
              }, 1000);
            }
          }
        }

        svg.addEventListener("pointermove", mover);
        svg.addEventListener("pointerup", soltar);
      }
    });
  }

  dibujarNivel();
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