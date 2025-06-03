// Implement selector function to get elements needed
// 1. Cell List
// 2. Current Turn
// 3. Replay Game
// 4. Game status
// selectors.js

// Lấy danh sách tất cả ô
export function getCellElementList() {
  return document.querySelectorAll("#cellList > li");
}

// Lấy phần tử hiển thị lượt hiện tại
export function getCurrentTurnElement() {
  return document.getElementById("currentTurn");
}

// Lấy phần tử ô tại vị trí index (0-8)
export function getCellElementAtIdx(index) {
  return document.querySelector(`#cellList > li:nth-child(${index + 1})`);
}

// Lấy phần tử hiển thị trạng thái trò chơi
export function getGameStatusElement() {
  return document.getElementById("gameStatus");
}

// Lấy nút Replay
export function getReplayButtonElement() {
  return document.getElementById("replayGame");
}