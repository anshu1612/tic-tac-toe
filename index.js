let currentPlayer = "X";
let game = true;
let ans = new Array(9).fill(null);

function init() {
  const reset = document.getElementById("restart");
  const closeBtn = document.getElementById("closeBtn");
  pageLoad();
  reset.addEventListener("click", restart);
  closeBtn.addEventListener("click", close);
}
function pageLoad() {
  const board = document.getElementById("box");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className =
      "bg-white rounded-sm w-12 h-12 text-fuchsia-600 font-extrabold text-2xl flex justify-center items-center";
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  let winnerPlayer = document.getElementById("winner");
  const modal = document.getElementById("modal");
  const cell = e.target;

  if (cell.textContent !== "") return;
  if (game) {
    cell.textContent = currentPlayer;
    const i = cell.dataset.index;
    ans[i] = currentPlayer;
    let winner = winning(ans);
    if (winner != null) {
      setTimeout(() => {
        winnerPlayer.textContent = winner;
        modal.classList.replace("hidden", "flex");
      }, 100);
    }
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  }
}

function winning(ans) {
  const winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
                               [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (ans[a] != null && ans[a] == ans[b] && ans[b] == ans[c]) {
      game = false;
      return "Player" + " " + ans[a] + " " + "wins!";
    }
  }
  for (let j = 0; j < ans.length; j++) {
    if (ans[j] === null) {
      return null;
    }
  }
  game = false;
  return "Draw";
}

function restart() {
  location.reload();
}
function close() {
  const modal = document.getElementById("modal");
  modal.classList.replace("flex", "hidden");
}

init();
