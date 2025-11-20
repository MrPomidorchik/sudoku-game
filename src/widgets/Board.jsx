import Cell from "../components/Cell.jsx";

const Board = (props) => {
  const {
    board,
    puzzle,
    solution,
    notes,
    selectedCell,
    onCellSelect,
    gameOver,
  } = props;

  if (!board || !puzzle) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-9 border">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isGiven = puzzle[rowIndex][colIndex] !== 0;
          const isSelected =
            selectedCell &&
            selectedCell.row === rowIndex &&
            selectedCell.col === colIndex;
          const isIncorrect =
            !isGiven &&
            value !== 0 &&
            solution &&
            value !== solution[rowIndex][colIndex];

          const cellNotes = notes?.[rowIndex]?.[colIndex] ?? [];
          const showNotes = value === 0 && cellNotes.length > 0;
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={value}
              r={rowIndex}
              c={colIndex}
              onClick={() => onCellSelect(rowIndex, colIndex)}
              cellNotes={cellNotes}
              showNotes={showNotes}
              isDisabled={gameOver}
              isGiven={isGiven}
              isSelected={isSelected}
              isIncorrect={isIncorrect}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
