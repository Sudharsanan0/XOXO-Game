const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const winLine = document.getElementById('win-line');

const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const drawScore = document.getElementById('draw-score');

let currentPlayer = 'X';
let boardState = Array(9).fill("");
let xWins = 0, oWins = 0, draws = 0;
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetAll);

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || boardState[idx]) return;

  boardState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    updateScore(currentPlayer);
  } else if (!boardState.includes("")) {
    draws++;
    drawScore.textContent = draws;
    message.textContent = "It's a Draw!";
    gameActive = false;
    setTimeout(resetBoard, 1600);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      showWinningLine(a, b, c);
      highlightWinnerCells([a, b, c]);
      return true;
    }
  }
  return false;
}
function showWinningLine(a, b, c) {
  const cellA = cells[a].getBoundingClientRect();
  const cellC = cells[c].getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  const startX = (cellA.left + cellA.right) / 2 - boardRect.left;
  const startY = (cellA.top + cellA.bottom) / 2 - boardRect.top;
  const endX = (cellC.left + cellC.right) / 2 - boardRect.left;
  const endY = (cellC.top + cellC.bottom) / 2 - boardRect.top;

  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx * dx + dy * dy);

  winLine.style.display = "block";
  winLine.style.left = `${startX}px`;
  winLine.style.top = `${startY}px`;
  winLine.style.transform = `rotate(${angle}rad)`;
  winLine.style.width = `${distance}px`;
}

function highlightWinnerCells(indices) {
  indices.forEach(i => cells[i].classList.add('winner'));
}

function updateScore(player) {
  if (player === 'X') {
    xWins++;
    xScore.textContent = xWins;
  } else {
    oWins++;
    oScore.textContent = oWins;
  }
  setTimeout(resetBoard, 1600);
}

function resetBoard() {
  boardState = Array(9).fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('winner'); // remove glow effect
  });
  currentPlayer = 'X';
  message.textContent = `Player X's Turn`;
  winLine.style.display = 'none';
  gameActive = true;
}

function resetAll() {
  xWins = 0; oWins = 0; draws = 0;
  xScore.textContent = 0; oScore.textContent = 0; drawScore.textContent = 0;
  resetBoard();
}
