// =============================================
// === games.js - Lógica completa de los juegos ===
// =============================================

// Variables globales
let currentGame = null;
let gameScore = 0;
let gameTimer = null;

// Objeto principal de juegos
const games = {
    // Juego 1: Seguir el Camino
    'path-game': {
        name: 'Seguir el Camino',
        description: 'Ejercita el control preciso del ratón o dedo.',
        instructions: 'Mueve el cursor para seguir el camino sin salirte de la línea.',
        start: function() {
            currentGame = 'path-game';
            renderGameUI(this);
            initPathGame();
        }
    },

    // Juego 2: Apretar Botones
    'button-game': {
        name: 'Apretar Botones',
        description: 'Mejora la velocidad y precisión de tus movimientos.',
        instructions: 'Presiona los botones que aparecen en la pantalla lo más rápido posible.',
        start: function() {
            currentGame = 'button-game';
            renderGameUI(this);
            initButtonGame();
        }
    },

    // Juego 3: Rompecabezas
    'puzzle-game': {
        name: 'Rompecabezas',
        description: 'Desarrolla coordinación ojo-mano y percepción espacial.',
        instructions: 'Arrastra las piezas para completar la imagen.',
        start: function() {
            currentGame = 'puzzle-game';
            renderGameUI(this);
            initPuzzleGame();
        }
    }
};

// ========================
// === Funciones Comunes ===
// ========================

function renderGameUI(game) {
    document.body.innerHTML = `
        <div class="game-container">
            <h2>${game.name}</h2>
            <p>${game.instructions}</p>
            <div class="game-content" id="game-content"></div>
            <button class="back-btn">Volver a Juegos</button>
        </div>
    `;
    
    // Evento para el botón de volver
    document.querySelector('.back-btn').addEventListener('click', () => {
        if (gameTimer) clearInterval(gameTimer);
        window.location.href = 'virtual.html';
    });
}

// ============================
// === Juego 1: Seguir el Camino ===
// ============================

function initPathGame() {
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div class="path-game-ui">
            <div class="score">Puntuación: <span>0</span></div>
            <div class="path-container">
                <svg class="path-svg" width="800" height="400"></svg>
                <div class="cursor-follower"></div>
            </div>
        </div>
    `;

    const svg = document.querySelector('.path-svg');
    const follower = document.querySelector('.cursor-follower');
    const scoreDisplay = document.querySelector('.score span');

    // Configuración inicial
    let score = 0;
    let isFollowing = false;
    let lastPosition = { x: 0, y: 0 };

    // Crear camino sinuoso
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = "M 50 200";
    
    for (let i = 1; i < 20; i++) {
        const x = 50 + i * 40;
        const y = 200 + Math.sin(i * 0.5) * 100;
        pathData += ` L ${x} ${y}`;
    }
    
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', '#3498db');
    path.setAttribute('stroke-width', '20');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);

    // Estilo del seguidor
    follower.style.width = '30px';
    follower.style.height = '30px';
    follower.style.backgroundColor = '#e74c3c';
    follower.style.borderRadius = '50%';
    follower.style.position = 'absolute';
    follower.style.pointerEvents = 'none';
    follower.style.transition = 'all 0.1s, background-color 0.3s';

    // Eventos de movimiento
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleTouch);

    function handleMove(e) {
        updateFollower(e.clientX, e.clientY);
    }

    function handleTouch(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            updateFollower(e.touches[0].clientX, e.touches[0].clientY);
        }
    }

    function updateFollower(x, y) {
        if (!isFollowing) {
            isFollowing = true;
            lastPosition = { x, y };
            positionFollower(x, y);
            return;
        }

        // Mover el seguidor
        positionFollower(x, y);

        // Calcular distancia desde la última posición
        const dx = x - lastPosition.x;
        const dy = y - lastPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Verificar posición respecto al camino
        const svgRect = svg.getBoundingClientRect();
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = x - svgRect.left;
        svgPoint.y = y - svgRect.top;

        const pathLength = path.getTotalLength();
        let closestDistance = Infinity;
        let closestPoint = path.getPointAtLength(0);

        // Optimizado: Buscar punto cercano en el camino
        for (let i = 0; i < pathLength; i += 15) {
            const point = path.getPointAtLength(i);
            const dist = Math.sqrt(Math.pow(svgPoint.x - point.x, 2) + Math.pow(svgPoint.y - point.y, 2));
            
            if (dist < closestDistance) {
                closestDistance = dist;
                closestPoint = point;
            }
        }

        // Actualizar puntuación y estilo
        if (closestDistance < 15) {
            score += distance * 0.2;
            scoreDisplay.textContent = Math.floor(score);
            follower.style.backgroundColor = '#2ecc71';
        } else {
            follower.style.backgroundColor = '#e74c3c';
        }

        lastPosition = { x, y };
    }

    function positionFollower(x, y) {
        follower.style.left = `${x - 15}px`;
        follower.style.top = `${y - 15}px`;
    }
}

// ==============================
// === Juego 2: Apretar Botones ===
// ==============================

function initButtonGame() {
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div class="button-game-ui">
            <div class="game-info">
                <div class="score">Puntuación: <span>0</span></div>
                <div class="timer">Tiempo: <span>60</span>s</div>
            </div>
            <div class="button-container"></div>
        </div>
    `;

    const container = document.querySelector('.button-container');
    const scoreDisplay = document.querySelector('.score span');
    const timerDisplay = document.querySelector('.timer span');

    // Variables del juego
    let score = 0;
    let timeLeft = 60;
    let gameActive = true;

    // Temporizador
    gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Crear botones
    function createButton() {
        if (!gameActive) return;

        const button = document.createElement('button');
        button.className = 'target-button';
        button.textContent = '¡Clic!';
        
        // Tamaño y posición aleatorios
        const size = Math.random() * 60 + 40; // Entre 40px y 100px
        const x = Math.random() * (container.clientWidth - size);
        const y = Math.random() * (container.clientHeight - size);

        // Estilo dinámico
        button.style.width = `${size}px`;
        button.style.height = `${size}px`;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.style.position = 'absolute';
        button.style.fontSize = `${size / 3}px`;
        button.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        button.style.border = 'none';
        button.style.borderRadius = '50%';
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.1s';

        // Evento de clic
        button.addEventListener('click', function() {
            // Puntuación basada en tamaño (botones más pequeños dan más puntos)
            score += Math.floor(150 - size);
            scoreDisplay.textContent = score;
            
            // Efecto al hacer clic
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (this.parentNode) {
                    container.removeChild(this);
                    createButton();
                }
            }, 100);
        });

        container.appendChild(button);

        // Desaparecer después de 1.5 segundos
        setTimeout(() => {
            if (button.parentNode) {
                container.removeChild(button);
                createButton();
            }
        }, 1500);
    }

    function endGame() {
        clearInterval(gameTimer);
        gameActive = false;
        
        // Eliminar todos los botones
        document.querySelectorAll('.target-button').forEach(btn => {
            btn.remove();
        });
        
        // Mostrar resultado final
        const finalScore = document.createElement('div');
        finalScore.className = 'final-score';
        finalScore.innerHTML = `
            <h3>¡Juego Terminado!</h3>
            <p>Tu puntuación final: ${score}</p>
        `;
        gameContent.appendChild(finalScore);
    }

    // Iniciar con 3 botones
    for (let i = 0; i < 3; i++) {
        setTimeout(createButton, i * 500);
    }
}

// ==========================
// === Juego 3: Rompecabezas ===
// ==========================

function initPuzzleGame() {
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div class="puzzle-game-ui">
            <div class="puzzle-container">
                <div class="puzzle-board"></div>
                <div class="puzzle-pieces"></div>
            </div>
            <div class="puzzle-info">
                <p>Arrastra las piezas al tablero para completar el rompecabezas</p>
            </div>
        </div>
    `;

    const board = document.querySelector('.puzzle-board');
    const piecesContainer = document.querySelector('.puzzle-pieces');

    // Configuración del rompecabezas
    const cols = 4;
    const rows = 3;
    const pieceSize = 100;
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#F3FF33',
        '#FF33F3', '#33FFF3', '#8A2BE2', '#FF7F50',
        '#7FFFD4', '#D2691E', '#6495ED', '#FFD700'
    ];

    // Crear tablero
    board.style.width = `${cols * pieceSize}px`;
    board.style.height = `${rows * pieceSize}px`;
    board.style.display = 'grid';
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.style.gap = '2px';
    board.style.margin = '0 auto';
    board.style.background = '#f0f0f0';
    board.style.border = '2px solid #34495e';

    // Crear espacios del tablero
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.x = x;
            slot.dataset.y = y;
            slot.style.background = 'white';
            board.appendChild(slot);
        }
    }

    // Crear piezas arrastrables
    for (let i = 0; i < rows * cols; i++) {
        const x = i % cols;
        const y = Math.floor(i / cols);
        
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.x = x;
        piece.dataset.y = y;
        piece.textContent = `${x + 1},${y + 1}`;
        piece.draggable = true;
        piece.style.width = `${pieceSize - 2}px`;
        piece.style.height = `${pieceSize - 2}px`;
        piece.style.background = colors[i];
        piece.style.display = 'flex';
        piece.style.alignItems = 'center';
        piece.style.justifyContent = 'center';
        piece.style.color = 'white';
        piece.style.fontWeight = 'bold';
        piece.style.cursor = 'move';
        piece.style.position = 'absolute';
        piece.style.left = `${Math.random() * 300}px`;
        piece.style.top = `${Math.random() * 200 + 300}px`;
        piece.style.userSelect = 'none';

        // Eventos de arrastre
        piece.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', `${x},${y}`);
            setTimeout(() => this.style.opacity = '0.4', 0);
        });

        piece.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });

        piecesContainer.appendChild(piece);
    }

    // Permitir soltar piezas
    board.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    board.addEventListener('drop', function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain').split(',');
        const x = parseInt(data[0]);
        const y = parseInt(data[1]);
        
        // Encontrar la pieza correspondiente
        const piece = document.querySelector(`.puzzle-piece[data-x="${x}"][data-y="${y}"]`);
        if (!piece) return;

        // Determinar posición de destino
        const rect = this.getBoundingClientRect();
        const dropX = Math.floor((e.clientX - rect.left) / pieceSize);
        const dropY = Math.floor((e.clientY - rect.top) / pieceSize);

        // Verificar si es la posición correcta
        if (dropX === x && dropY === y) {
            const slot = document.querySelector(`.puzzle-slot[data-x="${x}"][data-y="${y}"]`);
            
            // Colocar la pieza en el slot
            piece.style.position = 'static';
            piece.style.width = '100%';
            piece.style.height = '100%';
            slot.innerHTML = '';
            slot.appendChild(piece);
            
            // Verificar si el rompecabezas está completo
            checkPuzzleComplete();
        }
    });

    function checkPuzzleComplete() {
        const piecesOnBoard = document.querySelectorAll('.puzzle-slot .puzzle-piece');
        if (piecesOnBoard.length === cols * rows) {
            setTimeout(() => {
                alert('¡Felicidades! Has completado el rompecabezas.');
            }, 300);
        }
    }
}

// =============================
// === Inicialización General ===
// =============================

document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a los botones de juego en virtual.html
    if (document.getElementById('path-game')) {
        document.getElementById('path-game').addEventListener('click', function() {
            games['path-game'].start();
        });
        
        document.getElementById('button-game').addEventListener('click', function() {
            games['button-game'].start();
        });
        
        document.getElementById('puzzle-game').addEventListener('click', function() {
            games['puzzle-game'].start();
        });
    }
});