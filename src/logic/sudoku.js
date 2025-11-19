function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isSafe(board, row, col, num) {
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) {
    for (let c = bc; c < bc + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return { row: r, col: c };
    }
  }
  return null;
}

function fillBoard(board) {
  const empty = findEmpty(board);
  if (!empty) return true;

  const { row, col } = empty;
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

  for (const num of nums) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (fillBoard(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

export const DIFFICULTY_LEVELS = {
  easy: 30,
  medium: 40,
  hard: 50,
};

export function generateSudoku(empties = 40) {
  const board = createEmptyBoard();
  fillBoard(board);

  const solution = board.map((row) => [...row]);
  let removed = 0;
  let attempts = 0;

  while (removed < empties && attempts < 1000) {
    attempts++;
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (board[r][c] === 0) continue;
    board[r][c] = 0;
    removed++;
  }

  return {
    puzzle: board,
    solution,
  };
}
