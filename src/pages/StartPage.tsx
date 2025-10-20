 
import { Link } from "react-router-dom";
import s from "./StartPage.module.css";
import { AppRoutes } from "../types/app";

export const StartPage = () => {
  return (
    <div className={s.startPage}>
      <h1>Four In A Row Game</h1>
      <p>
        Welcome to the Four In A Row game! Click "Start Game" to begin playing.
      </p>
      <Link to={AppRoutes.Game}>
        <button>Start Game</button>
      </Link>
    </div>
  );
};
