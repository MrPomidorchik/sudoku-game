import Cell from "./Cell.jsx";
const Board = (props) => {
  const { board, onCellChange } = props;

  return (
    <div className="grid grid-cols-9 border-black border-2">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((cell, collIndex) => (
            <Cell key={collIndex} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
