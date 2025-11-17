// src/App.jsx
import React, { useState } from "react";
import MainMenu from "./GPT/MainMenu.jsx";
import GameScreen from "./GPT/GameScreen.jsx";
import { generateSudoku, DIFFICULTY_LEVELS } from "./logic/sudoku.js";

function cloneNotes(notes) {
  return notes.map((row) => row.map((cell) => [...cell]));
}

export default function App() {
  const [view, setView] = useState("menu");
  const [difficulty, setDifficulty] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [board, setBoard] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [noteMode, setNoteMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

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

  const startGame = (level) => {
    const empties = DIFFICULTY_LEVELS[level] ?? DIFFICULTY_LEVELS.medium;
    const { puzzle, solution } = generateSudoku(empties);

    setDifficulty(level);
    setPuzzle(puzzle);
    setSolution(solution);
    setBoard(puzzle.map((row) => [...row]));
    setNotes(
      Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []))
    );
    setSelectedCell(null);
    setNoteMode(false);
    setHistory([]);
    setGameCompleted(false);
    setView("game");
  };

  const handleCellSelect = (row, col) => {
    if (!board || gameCompleted) return;
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
    setGameCompleted(true);
  };

  const handleNumberClick = (num) => {
    if (!selectedCell || !board || !puzzle || gameCompleted) return;

    const { row, col } = selectedCell;
    // нельзя изменять "данные" клетки
    if (puzzle[row][col] !== 0 && !noteMode) return;

    pushHistory();

    if (noteMode) {
      // режим заметок
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
    if (!selectedCell || !board || !puzzle || gameCompleted) return;
    const { row, col } = selectedCell;

    pushHistory();

    if (noteMode) {
      // в режиме заметок ластик чистит заметки
      setNotes((prev) => {
        const next = cloneNotes(prev);
        next[row][col] = [];
        return next;
      });
    } else {
      if (puzzle[row][col] !== 0) return; // нельзя стереть исходную цифру
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
      setGameCompleted(false);
      return prev.slice(0, -1);
    });
  };

  const handleBackToMenu = () => {
    setView("menu");
  };

  const handleReturnToMenu = () => {
    setView("menu");
    setDifficulty(null);
    setPuzzle(null);
    setSolution(null);
    setBoard(null);
    setNotes(null);
    setSelectedCell(null);
    setHistory([]);
    setNoteMode(false);
    setGameCompleted(false);
  };

  if (view === "menu") {
    return <MainMenu onStart={startGame} />;
  }

  return (
    <GameScreen
      board={board}
      puzzle={puzzle}
      solution={solution}
      notes={notes}
      selectedCell={selectedCell}
      onCellSelect={handleCellSelect}
      onNumberClick={handleNumberClick}
      onEraserClick={handleEraserClick}
      onUndo={handleUndo}
      noteMode={noteMode}
      onToggleNoteMode={() => setNoteMode((prev) => !prev)}
      difficulty={difficulty}
      onBackToMenu={handleBackToMenu}
      gameCompleted={gameCompleted}
      onReturnToMenu={handleReturnToMenu}
    />
  );
}
