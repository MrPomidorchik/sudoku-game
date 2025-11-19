import { useState } from "react";
import GameScreen from "./pages/GameScreen.jsx";

function App() {
  return (
    <>
      <div className="m-0 p-0 flex flex-col items-center justify-center h-screen gap-8 select-none">
        <GameScreen />
      </div>
    </>
  );
}

export default App;
