import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/types/app";
import s from "./GameModePage.module.css";
import { GameMode } from "@/types/game";

export const GameModePage = () => {
  const navigate = useNavigate();

  const handleSelectMode = (mode: GameMode) => {
    navigate(AppRoutes.Game, { 
      state: { 
        gameMode: mode 
      } 
    });
  };

  return (
    <div className={s.gamePage}>
      <h1>Choose Game Mode</h1>
      <div className={s.gamePageButtons}>
        <button 
          className={s.gamePageButton}
          onClick={() => handleSelectMode(GameMode.PVP)}
        >
          <img className={s.gamePageImage} src="/person.png" alt="Person" />
          <img className={s.gamePageImage} src="/person.png" alt="Person" />
        </button>

        <button 
          className={s.gamePageButton}
          onClick={() => handleSelectMode(GameMode.PVE)}
        >
          <img className={s.gamePageImage} src="/person.png" alt="Person" />
          <img className={s.gamePageImage} src="/robot.png" alt="Robot" />
        </button>
      </div>
    </div>
  );
};