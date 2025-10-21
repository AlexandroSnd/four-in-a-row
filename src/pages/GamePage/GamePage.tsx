import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GameBoard } from "../../components/game/GameBoard/GameBoard";
import { GameOverModal } from "../../components/game/GameOverModal/GameOverModal";
import { PlayersQueue } from "../../components/game/PlayersQueue";
import { Timer } from "../../components/game/Timer";
import { useConnectFourGame } from "../../hooks/useConnectFourGame";
import type { GameMode } from "../../types/game";
import s from "./GamePage.module.css";

export const GamePage = () => {
  const location = useLocation();
  const gameMode = location.state?.gameMode as GameMode;

  const {
    boardState,
    currentPlayer,
    isGameOver,
    winner,
    isInputBlocked,
    makeMove,
    resetGame,
  } = useConnectFourGame(gameMode);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePlayerMove = (colIndex: number) => {
    if (isInputBlocked) {
      console.log("Подождите, бот думает...");
      return;
    }
    makeMove(colIndex);
  };

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 500);

      if (winner === null) {
        console.log("Конец игры. Ничья.");
      } else if (winner) {
        console.log(`Конец игры. Победил ${winner}`);
      }

      return () => clearTimeout(timer);
    } else if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isGameOver, isModalOpen, winner]);

  const handleRestart = () => {
    setIsModalOpen(false);
    resetGame();
  };

  return (
    <div className={s.container}>
      <GameBoard
        boardState={boardState}
        onColumnClick={handlePlayerMove}
        isInputBlocked={isInputBlocked}
      />
      <Timer isGameOver={isGameOver} />
      <PlayersQueue currentPlayer={currentPlayer} />

      {isModalOpen && (
        <GameOverModal winner={winner} onRestart={handleRestart} />
      )}
    </div>
  );
};
