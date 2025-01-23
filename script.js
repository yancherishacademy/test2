// Health Variables
let health1 = 100;
let health2 = 100;

// Get elements
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const healthDisplay1 = document.getElementById('health1');
const healthDisplay2 = document.getElementById('health2');

// Movement Variables
let player1Pos = 50;
let player2Pos = 500;
let player1Jumping = false;
let player2Jumping = false;
let player1YPos = 0;
let player2YPos = 0;
const arenaWidth = 600;
const jumpHeight = 100;
const gravity = 5;

// Key Codes
const keys = {
    a: false,  // Player 1 move left
    d: false,  // Player 1 move right
    w: false,  // Player 1 jump
    s: false,  // Player 1 kick
    space: false, // Player 1 punch
    ArrowLeft: false,  // Player 2 move left
    ArrowRight: false, // Player 2 move right
    ArrowUp: false,    // Player 2 jump
    Shift: false,      // Player 2 kick
    Enter: false // Player 2 punch
};

// Key Down Event Listener
window.addEventListener('keydown', function(e) {
    if (e.key === 'a') keys.a = true;
    if (e.key === 'd') keys.d = true;
    if (e.key === 'w' && !player1Jumping) keys.w = true;
    if (e.key === 's') keys.s = true;
    if (e.key === ' ') keys.space = true;
    if (e.key === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.key === 'ArrowRight') keys.ArrowRight = true;
    if (e.key === 'ArrowUp' && !player2Jumping) keys.ArrowUp = true;
    if (e.key === 'Shift') keys.Shift = true;
    if (e.key === 'Enter') keys.Enter = true;
});

// Key Up Event Listener
window.addEventListener('keyup', function(e) {
    if (e.key === 'a') keys.a = false;
    if (e.key === 'd') keys.d = false;
    if (e.key === 'w') keys.w = false;
    if (e.key === 's') keys.s = false;
    if (e.key === ' ') keys.space = false;
    if (e.key === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.key === 'ArrowRight') keys.ArrowRight = false;
    if (e.key === 'ArrowUp') keys.ArrowUp = false;
    if (e.key === 'Shift') keys.Shift = false;
    if (e.key === 'Enter') keys.Enter = false;
});

// Update Positions and Handle Attacks
function update() {
    // Player 1 Movement
    if (keys.a && player1Pos > 0) player1Pos -= 5;
    if (keys.d && player1Pos < arenaWidth - 50) player1Pos += 5;

    // Player 2 Movement
    if (keys.ArrowLeft && player2Pos > 0) player2Pos -= 5;
    if (keys.ArrowRight && player2Pos < arenaWidth - 50) player2Pos += 5;

    // Player 1 Jump
    if (keys.w && !player1Jumping) {
        player1Jumping = true;
        player1YPos = jumpHeight;
    }

    if (player1Jumping) {
        player1YPos -= gravity;
        if (player1YPos <= 0) {
            player1YPos = 0;
            player1Jumping = false;
        }
    }

    // Player 2 Jump
    if (keys.ArrowUp && !player2Jumping) {
        player2Jumping = true;
        player2YPos = jumpHeight;
    }

    if (player2Jumping) {
        player2YPos -= gravity;
        if (player2YPos <= 0) {
            player2YPos = 0;
            player2Jumping = false;
        }
    }

    // Player 1 Attack
    if (keys.space && Math.abs(player1Pos - player2Pos) < 60) {
        health2 -= 5; // Punch damage
        healthDisplay2.textContent = `P2 Health: ${health2}`;
        if (health2 <= 0) {
            alert('Player 1 wins!');
            resetGame();
        }
    }

    if (keys.s && Math.abs(player1Pos - player2Pos) < 60) {
        health2 -= 10; // Kick damage
        healthDisplay2.textContent = `P2 Health: ${health2}`;
        if (health2 <= 0) {
            alert('Player 1 wins!');
            resetGame();
        }
    }

    // Player 2 Attack
    if (keys.Enter && Math.abs(player2Pos - player1Pos) < 60) {
        health1 -= 5; // Punch damage
        healthDisplay1.textContent = `P1 Health: ${health1}`;
        if (health1 <= 0) {
            alert('Player 2 wins!');
            resetGame();
        }
    }

    if (keys.Shift && Math.abs(player2Pos - player1Pos) < 60) {
        health1 -= 10; // Kick damage
        healthDisplay1.textContent = `P1 Health: ${health1}`;
        if (health1 <= 0) {
            alert('Player 2 wins!');
            resetGame();
        }
    }

    // Update Player Positions and Y Position for Jump
    player1.style.left = player1Pos + 'px';
    player1.style.bottom = player1YPos + 'px';
    player2.style.left = player2Pos + 'px';
    player2.style.bottom = player2YPos + 'px';

    requestAnimationFrame(update);
}

// Reset Game
function resetGame() {
    health1 = 100;
    health2 = 100;
    healthDisplay1.textContent = 'P1 Health: 100';
    healthDisplay2.textContent = 'P2 Health: 100';
    player1Pos = 50;
    player2Pos = 500;
    player1YPos = 0;
    player2YPos = 0;
}

// Start the game loop
update();


