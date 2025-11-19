import { useState } from "react";
import { generateSudoku, DIFFICULTY_LEVELS } from "../logic/sudoku.js";
import Board from "../widgets/Board.jsx";
import ControlBar from "../widgets/ControlBar.jsx";

const { puzzle, solution } = generateSudoku(40);

const GameScreen = () => {
  const [board, setBoard] = useState(puzzle);
  if (!board || !puzzle) return <div>Loading...</div>;
  return (
    <>
      <Board
        board={board}
        puzzle={puzzle}
        solution={solution}
        notes={notes}
        selectedCell={selectedCell}
        onCellSelect={onCellSelect}
        gameOver={gameOver}
      />
      <ControlBar />
    </>
  );
};

export default GameScreen;
