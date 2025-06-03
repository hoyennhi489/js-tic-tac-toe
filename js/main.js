import {
  getCellElementList,
  getCurrentTurnElement,
  getCellElementAtIdx,
  getGameStatusElement,
  getReplayButtonElement,
} from './selectors.js';

// Biến toàn cục
let currentTurn = 'cross'; // Người chơi hiện tại
let isGameEnded = false; // Cờ kết thúc trò chơi
let cellValues = new Array(9).fill(''); // Mảng lưu trạng thái của các ô

// Hàm chuyển lượt chơi
function toggleTurn() {
  currentTurn = currentTurn === 'cross' ? 'circle' : 'cross';
  const turnElement = getCurrentTurnElement();
  turnElement.className = currentTurn;
}

// Cập nhật trạng thái trò chơi lên UI
function updateGameStatus(status) {
  const statusElement = getGameStatusElement();
  if (statusElement) statusElement.textContent = status;
}

// Hiện nút chơi lại
function showReplayButton() {
  const button = getReplayButtonElement();
  if (button) button.classList.add('show');
}

// Ẩn nút chơi lại
function hideReplayButton() {
  const button = getReplayButtonElement();
  if (button) button.classList.remove('show');
}

// Kiểm tra trạng thái trò chơi: thắng, hòa, hay còn chơi
function checkGameStatus() {
  const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const positions of winPositions) {
    const [a, b, c] = positions;
    if (
      cellValues[a] &&
      cellValues[a] === cellValues[b] &&
      cellValues[a] === cellValues[c]
    ) {
      isGameEnded = true;
      updateGameStatus(`${cellValues[a].toUpperCase()} WIN!!!`);
      highlightWinCells(positions);
      showReplayButton();
      return;
    }
  }

  // Kiểm tra hòa
  if (!cellValues.includes('')) {
    isGameEnded = true;
    updateGameStatus('Draw!');
    showReplayButton();
    return;
  }

  // Nếu chưa kết thúc
  updateGameStatus('Playing...');
}

// Tô sáng các ô thắng
function highlightWinCells(winPositions) {
  for (const idx of winPositions) {
    const cell = getCellElementAtIdx(idx);
    if (cell) cell.classList.add('win');
  }
}

// Xử lý khi click vào ô
function handleCellClick(cell, index) {
  const isClicked = cell.classList.contains('cross') || cell.classList.contains('circle');
  if (isGameEnded || isClicked) return;

  // Đánh dấu UI
  cell.classList.add(currentTurn);

  // Cập nhật dữ liệu
  cellValues[index] = currentTurn;

  // Kiểm tra trạng thái trò chơi
  checkGameStatus();

  // Chuyển lượt
  toggleTurn();
}

// Reset trò chơi về trạng thái ban đầu
function resetGame() {
  currentTurn = 'cross';
  isGameEnded = false;
  cellValues = new Array(9).fill('');

  const cellList = getCellElementList();
  for (const cell of cellList) {
    cell.className = '';
  }

  updateGameStatus('Playing...');
  hideReplayButton();
  getCurrentTurnElement().className = 'cross';
}

// Khởi tạo trò chơi
function init() {
  const cellList = getCellElementList();
  cellList.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
  });

  const replayButton = getReplayButtonElement();
  if (replayButton) {
    replayButton.addEventListener('click', resetGame);
  }

  updateGameStatus('Playing...');
  getCurrentTurnElement().className = 'cross';
}

// Bắt đầu trò chơi
init();

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */