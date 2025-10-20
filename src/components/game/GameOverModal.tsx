 
import React from "react";
import { baseBoardState, Player, type Board } from "../../types/game";
import s from "./GameOverModal.module.css";

interface GameOverModalProps {
  winner: Player | null; // Победитель или null, если ничья
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardState: React.Dispatch<React.SetStateAction<Board>>;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner, setIsGameOver, setBoardState, setIsModalShow
}) => {

  const title = winner ? `Победитель: ${winner}` : "Ничья!";

  const chipColorClass =
    winner === Player.One
      ? s.playerOneColor
      : winner === Player.Two
      ? s.playerTwoColor
      : s.drawColor;

    const onRestart = () => {
        setIsModalShow(false);
        setIsGameOver(false);
        setBoardState(baseBoardState);
    };

  return (
    <div className={s.overlay}>
      <div className={`${s.modalContainer} ${chipColorClass}`}>
        <h2 className={s.modalTitle}>{title}</h2>

        <p className={s.modalMessage}>Партия завершена!</p>

        <button className={s.restartButton} onClick={onRestart}>
          Начать заново
        </button>
      </div>
    </div>
  );
};