import { Link } from "react-router-dom";
import { AppRoutes } from "../../types/app";
import s from "./StartPage.module.css";

export const StartPage = () => {
  return (
    <div className={s.startPage}>
      <h1>Four In A Row Game</h1>
      <p>
        Welcome to the Four In A Row game! Click "Start Game" to begin playing.
      </p>
      <Link to={AppRoutes.GameMode}>
        <button>Start Game</button>
      </Link>
    </div>
  );
};
