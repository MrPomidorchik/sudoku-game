// src/components/SudokuBoard.jsx
import React from "react";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

const blockBorder = (row, col) => {
  const classes = [];
  if (row % 3 === 0) classes.push("border-t-2 border-t-slate-500");
  if (col % 3 === 0) classes.push("border-l-2 border-l-slate-500");
  if (row === 8) classes.push("border-b-2 border-b-slate-500");
  if (col === 8) classes.push("border-r-2 border-r-slate-500");
  return classes.join(" ");
};

export default function SudokuBoard({
  board,
  puzzle,
  solution,
  notes,
  selectedCell,
  onCellSelect,
  gameCompleted,
}) {
  if (!board || !puzzle) return null;

  return (
    <div className="inline-grid grid-cols-9 bg-slate-700 rounded-xl overflow-hidden shadow-2xl">
      {board.map((row, rIdx) =>
        row.map((value, cIdx) => {
          const isGiven = puzzle[rIdx][cIdx] !== 0;
          const isSelected =
            selectedCell &&
            selectedCell.row === rIdx &&
            selectedCell.col === cIdx;

          const isIncorrect =
            !isGiven &&
            value !== 0 &&
            solution &&
            value !== solution[rIdx][cIdx];

          const cellNotes = notes?.[rIdx]?.[cIdx] ?? [];
          const showNotes = value === 0 && cellNotes.length > 0;

          return (
            <button
              key={`${rIdx}-${cIdx}`}
              type="button"
              disabled={gameCompleted}
              onClick={() => onCellSelect(rIdx, cIdx)}
              className={classNames(
                "relative aspect-square flex items-center justify-center text-lg sm:text-2xl",
                "border border-slate-600",
                blockBorder(rIdx, cIdx),
                isGiven
                  ? "bg-slate-900 text-slate-100 font-semibold"
                  : "bg-slate-950 text-slate-100",
                isSelected ? "ring-2 ring-emerald-400 z-10" : "",
                !isGiven && !gameCompleted ? "hover:bg-slate-800" : "",
                gameCompleted ? "cursor-default" : "cursor-pointer"
              )}
            >
              {showNotes ? (
                <div className="grid grid-cols-3 gap-px text-[0.55rem] sm:text-[0.6rem] text-slate-400 leading-none">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                    <span
                      key={num}
                      className={cellNotes.includes(num) ? "" : "opacity-20"}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              ) : value !== 0 ? (
                <span
                  className={classNames(
                    "select-none",
                    isGiven ? "" : "font-medium",
                    isIncorrect ? "text-red-500" : ""
                  )}
                >
                  {value}
                </span>
              ) : null}
            </button>
          );
        })
      )}
    </div>
  );
}
