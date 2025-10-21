// src/pages/GamePage.tsx

import { useEffect, useState } from "react";
import { GameBoard } from "../../components/game/GameBoard/GameBoard";
import { GameOverModal } from "../../components/game/GameOverModal/GameOverModal";
import { PlayersQueue } from "../../components/game/PlayersQueue";
import { Timer } from "../../components/game/Timer";
import { useConnectFourGame } from "../../hooks/useConnectFourGame";
import s from "./GamePage.module.css";

export const GamePage = () => {

  const { boardState, currentPlayer, isGameOver, winner, makeMove, resetGame } =
    useConnectFourGame();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <GameBoard boardState={boardState} onColumnClick={makeMove} />
      <Timer isGameOver={isGameOver} />
      <PlayersQueue currentPlayer={currentPlayer} />

      {isModalOpen && (
        <GameOverModal winner={winner} onRestart={handleRestart} />
      )}
    </div>
  );
};
