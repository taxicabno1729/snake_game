// Initialize game variables
let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let gameLoop;

// Game initialization function
function initializeGame() {
    // Reset game state
    snake = ['·'];
    score = 0;
    direction = 'right';
    spawnFood();
    
    // Start game loop
    if (gameLoop) return;
    gameLoop = setInterval(gameStep, 100);
}

// Spawn food at random position
function spawnFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * 40);
        y = Math.floor(Math.random() * 40);
    } while (snake.some(cell => cell.x === x && cell.y === y));
    
    food = {
        x: x,
        y: y
    };
}

// Game step function
function gameStep() {
    // Move snake
    const head = {...snake[0]};
    
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check wall collision
    if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40) {
        gameOver();
        return;
    }
    
    // Check self collision
    if (snake.some(cell => cell.x === head.x && cell.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        spawnFood();
    } else {
        snake.pop();
    }
}

// Handle direction changes
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

// Start game function
function startGame() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('endButton').disabled = true;
    
    initializeGame();
}

// End game function
function endGame() {
    clearInterval(gameLoop);
    alert(`Game Over! Final Score: ${score}`);
    document.getElementById('startButton').disabled = false;
    document.getElementById('endButton').disabled = false;
}

// Restart game function
function restartGame() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('endButton').disabled = true;
    initializeGame();
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) canvas.width = canvas.width === '100%' ? window.innerWidth : canvas.width;
    canvas.height = canvas.height === '100%' ? window.innerHeight : canvas.height;
});
