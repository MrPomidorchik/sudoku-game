import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { generateSudoku, DIFFICULTY_LEVELS } from "../logic/sudoku.js";
import Board from "../widgets/Board.jsx";
import ControlBar from "../widgets/ControlBar.jsx";

function cloneNotes(notes) {
  return notes.map((row) => row.map((cell) => [...cell]));
}

const GameScreen = () => {
  const { difficulty: difficultyParam } = useParams();
  const navigate = useNavigate();

  const [difficulty] = useState(difficultyParam);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [board, setBoard] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [noteMode, setNoteMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const level =
      DIFFICULTY_LEVELS[difficultyParam] || DIFFICULTY_LEVELS.medium;
    const { puzzle, solution } = generateSudoku(level);
    setPuzzle(puzzle);
    setSolution(solution);
    setBoard(puzzle.map((row) => row.slice()));
    setNotes(
      Array(9)
        .fill(0)
        .map(() => Array(9).fill([]))
    );
    setSelectedCell(null);
    setNoteMode(false);
    setHistory([]);
    setGameOver(false);
  }, [difficultyParam]);

  const pushHistory = () => {
    if (!board || !notes) return;
    setHistory((prev) => [
      ...prev,
      {
        board: board.map((row) => [...row]),
        notes: cloneNotes(notes),
      },
    ]);
  };

  const handleCellSelect = (row, col) => {
    if (!board || gameOver) return;
    setSelectedCell({ row, col });
  };

  const checkCompletion = (newBoard) => {
    if (!solution) return;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newBoard[r][c] === 0) return;
        if (newBoard[r][c] !== solution[r][c]) return;
      }
    }
    setGameOver(true);
  };

  const handleNumberClick = (num) => {
    if (!selectedCell || !board || !puzzle || gameOver) return;

    const { row, col } = selectedCell;

    // нельзя менять исходные цифры в обычном режиме
    if (puzzle[row][col] !== 0 && !noteMode) return;

    pushHistory();

    if (noteMode) {
      setNotes((prev) => {
        const next = cloneNotes(prev);
        const cellNotes = next[row][col];
        if (cellNotes.includes(num)) {
          next[row][col] = cellNotes.filter((n) => n !== num);
        } else {
          next[row][col] = [...cellNotes, num].sort((a, b) => a - b);
        }
        return next;
      });
    } else {
      const newBoard = board.map((r) => [...r]);
      const newNotes = cloneNotes(notes);
      newBoard[row][col] = num;
      newNotes[row][col] = [];
      setBoard(newBoard);
      setNotes(newNotes);
      checkCompletion(newBoard);
    }
  };

  const handleEraserClick = () => {
    if (!selectedCell || !board || !puzzle || gameOver) return;
    const { row, col } = selectedCell;

    pushHistory();

    if (noteMode) {
      setNotes((prev) => {
        const next = cloneNotes(prev);
        next[row][col] = [];
        return next;
      });
    } else {
      if (puzzle[row][col] !== 0) return; // не стираем данную цифру
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = 0;
      setBoard(newBoard);
    }
  };

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setBoard(last.board);
      setNotes(last.notes);
      setGameOver(false);
      return prev.slice(0, -1);
    });
  };

  if (!board || !puzzle) return <div>Loading...</div>;
  return (
    <>
      <Board
        board={board}
        puzzle={puzzle}
        solution={solution}
        notes={notes}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
        gameOver={gameOver}
      />
      <ControlBar
        onNumberClick={handleNumberClick}
        onEraserClick={handleEraserClick}
        onUndoClick={handleUndo}
        onToggleNoteMode={() => setNoteMode((prev) => !prev)}
        noteMode={noteMode}
      />
    </>
  );
};

export default GameScreen;
