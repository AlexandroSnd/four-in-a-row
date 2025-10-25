import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GameModePage } from "@/pages/GameModePage/GameModePage";
import { GamePage } from "@/pages/GamePage/GamePage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { StartPage } from "@/pages/StartPage/StartPage";
import { AppRoutes } from "@/types/app";

function App() {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.Home} element={<StartPage />} />
        <Route path={AppRoutes.GameMode} element={<GameModePage />} />
        <Route path={AppRoutes.Game} element={<GamePage />} />
        <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
