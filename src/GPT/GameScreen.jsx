// src/components/GameScreen.jsx
import React from "react";
import SudokuBoard from "./SudokuBoard.jsx";

const difficultyLabel = {
  easy: "Лёгкий",
  medium: "Средний",
  hard: "Сложный",
};

export default function GameScreen({
  board,
  puzzle,
  solution,
  notes,
  selectedCell,
  onCellSelect,
  onNumberClick,
  onEraserClick,
  onUndo,
  noteMode,
  onToggleNoteMode,
  difficulty,
  onBackToMenu,
  gameCompleted,
  onReturnToMenu,
}) {
  if (!board || !puzzle) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-4 py-8">
      {/* Верхняя панель */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 rounded-xl border border-slate-600 bg-slate-900 hover:bg-slate-800 transition text-sm"
        >
          ← В меню
        </button>
        <div className="text-center flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Sudoku
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Сложность:{" "}
            <span className="font-medium text-emerald-400">
              {difficultyLabel[difficulty] || "—"}
            </span>
          </p>
        </div>
        <div className="w-[88px]" /> {/* для симметрии */}
      </div>

      {/* Игровое поле + панель управления */}
      <div className="flex flex-col items-center gap-6">
        <SudokuBoard
          board={board}
          puzzle={puzzle}
          solution={solution}
          notes={notes}
          selectedCell={selectedCell}
          onCellSelect={onCellSelect}
          gameCompleted={gameCompleted}
        />

        {/* Панель кнопок */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          {/* Номерная клавиатура */}
          <div className="grid grid-cols-9 gap-2 w-full">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => onNumberClick(num)}
                className="py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 active:scale-95 transition text-sm sm:text-base font-medium"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Служебные кнопки */}
          <div className="flex justify-between gap-3 w-full">
            <button
              onClick={onUndo}
              className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 active:scale-95 transition text-sm sm:text-base"
            >
              Отмена
            </button>
            <button
              onClick={onEraserClick}
              className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 active:scale-95 transition text-sm sm:text-base"
            >
              Ластик
            </button>
            <button
              onClick={onToggleNoteMode}
              className={
                "flex-1 py-2 rounded-xl border text-sm sm:text-base transition active:scale-95 " +
                (noteMode
                  ? "bg-emerald-500 border-emerald-400 text-slate-950"
                  : "bg-slate-900 border-slate-700 hover:bg-slate-800")
              }
            >
              Заметки
            </button>
          </div>
        </div>
      </div>

      {/* Модалка завершения игры */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-slate-900 border border-emerald-500 rounded-2xl px-6 py-5 max-w-sm w-full text-center shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              Поздравляем!
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-5">
              Вы успешно решили судоку 🧩
            </p>
            <button
              onClick={onReturnToMenu}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition active:scale-95"
            >
              Вернуться в главное меню
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
