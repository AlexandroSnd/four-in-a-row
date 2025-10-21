import React from "react";
import { Player } from "../../../types/game";
import s from "./GameOverModal.module.css";

interface GameOverModalProps {
  winner: Player | null;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  onRestart,
}) => {
  const title = winner ? `Winner: ${winner}` : "Draw!";

  const chipColorClass =
    winner === Player.One
      ? s.playerOneColor
      : winner === Player.Two
      ? s.playerTwoColor
      : s.drawColor;

  return (
    <div className={s.overlay}>
      <div className={`${s.modalContainer} ${chipColorClass}`}>
        <h2 className={s.modalTitle}>{title}</h2>

        <p className={s.modalMessage}>The party is over!</p>

        <button className={s.restartButton} onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
};
