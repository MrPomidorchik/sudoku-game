import { Routes, Route } from "react-router";
import MainMenu from "./pages/MainMenu.jsx";
import GameScreen from "./pages/GameScreen.jsx";

function App() {
  return (
    <>
      <div className="m-0 p-0 flex flex-col items-center justify-center h-screen gap-8 select-none">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game/:difficulty" element={<GameScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
