let currentPlayer = 'O';
let board = Array(9).fill(''); // A simple array representing the game state.
let gameOver = false;

// Restart game functionality
function startGame() {
    board = Array(9).fill('');
    currentPlayer = 'O';
    gameOver = false;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '';
    });
    updateMessage();
}

// Handle cell click
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {
    const index = e.target.id; // Get index of clicked cell
    if (board[index] !== '' || gameOver) return;

    board[index] = currentPlayer; // Save current player's move
    e.target.innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`;
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('message').innerText = `It's a draw!`;
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        updateMessage();
    }
}

// Check if the current player has won
function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]            // Diagonal
    ];

    for (let combo of winCombos) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            return true;
        }
    }
    return false;
}

// Update message text
function updateMessage() {
    if (!gameOver) {
        document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
    }
}
