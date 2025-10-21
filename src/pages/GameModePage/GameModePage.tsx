import { Link } from "react-router-dom";
import { AppRoutes } from "../../types/app";
import s from "./GameModePage.module.css";

export const GameModePage = () => {
  return (
    <div className={s.gamePage}>
      <h1>Choose Game Mode</h1>
      <div className={s.gamePageButtons}>
        <Link to={AppRoutes.Game}>
          <button className={s.gamePageButton}>
            <img className={s.gamePageImage} src="/person.png" alt="Person" />
            <img className={s.gamePageImage} src="/person.png" alt="Person" />
          </button>
        </Link>
        <Link to={AppRoutes.Game}>
          <button className={s.gamePageButton}>
            <img className={s.gamePageImage} src="/person.png" alt="Person" />
            <img className={s.gamePageImage} src="/robot.png" alt="Robot" />
          </button>
        </Link>
      </div>
    </div>
  );
};
