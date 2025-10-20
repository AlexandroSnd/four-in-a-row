import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GamePage } from "./pages/GamePage/GamePage";
import { StartPage } from "./pages/StartPage/StartPage";
import { AppRoutes } from "./types/app";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.Game} element={<GamePage />} />
        <Route path={AppRoutes.Home} element={<StartPage />} />
        <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
