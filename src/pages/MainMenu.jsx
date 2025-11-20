import React from "react";
import { useNavigate } from "react-router";

const MainMenu = () => {
  const navigate = useNavigate();

  const handleStart = (difficulty) => {
    navigate(`/game/${difficulty}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="text-center px-6 py-8 bg-slate-900/70 border border-slate-700 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide mb-2">
          Sudoku
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Простая игра с генерацией поля и заметками
        </p>

        <div className="relative inline-block text-left group">
          <button className="px-8 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm sm:text-base shadow-lg transition">
            Play
          </button>

          <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl overflow-hidden">
              <button
                onClick={() => handleStart("easy")}
                className="w-full px-4 py-2 text-sm hover:bg-slate-800 text-left"
              >
                Лёгкий
              </button>
              <button
                onClick={() => handleStart("medium")}
                className="w-full px-4 py-2 text-sm hover:bg-slate-800 text-left border-t border-slate-800"
              >
                Средний
              </button>
              <button
                onClick={() => handleStart("hard")}
                className="w-full px-4 py-2 text-sm hover:bg-slate-800 text-left border-t border-slate-800"
              >
                Сложный
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-[0.7rem] text-slate-500">
          В будущем можно добавить таймер, счётчик очков и сохранения.
        </p>
      </div>
    </div>
  );
};

export default MainMenu;
