import { Confetti } from "@neoconfetti/react";
import { useLocation } from "react-router-dom";
import { GameBoard } from "../../components/game/GameBoard/GameBoard";
import { GameOverModal } from "../../components/game/GameOverModal/GameOverModal";
import { PlayersQueue } from "../../components/game/PlayersQueue";
import { Timer } from "../../components/game/Timer";
import { useConnectFourGame } from "../../hooks/useConnectFourGame";
import { useGamePageFlow } from "../../hooks/useGamePageFlow";
import type { GameMode } from "../../types/game";
import s from "./GamePage.module.css";
import { Score } from "../../components/game/Score";

export const GamePage = () => {
  const location = useLocation();
  const gameMode = location.state?.gameMode as GameMode;

  const gameApi = useConnectFourGame(gameMode);

  const { isModalOpen, handleRestart, handleBackToMenu, winner } =
    useGamePageFlow(gameApi);

  const { boardState, currentPlayer, isGameOver, isInputBlocked, makeMove, score} =
    gameApi;

  const handlePlayerMove = (colIndex: number) => {
    if (isInputBlocked) {
      return;
    }
    makeMove(colIndex);
  };

  return (
    <div className={s.container}>
      <Score score={score}/>
      <GameBoard
        boardState={boardState}
        onColumnClick={handlePlayerMove}
        isInputBlocked={isInputBlocked}
      />
      <Timer isGameOver={isGameOver} />
      <PlayersQueue currentPlayer={currentPlayer} />

      {isModalOpen && (
        <>
          <div className={s.confettiContainer}>
            <Confetti duration={2000} force={0.5} class={s.confetti} />
          </div>

          <GameOverModal
            winner={winner}
            onRestart={handleRestart}
            onBackToMenu={handleBackToMenu}
          />
        </>
      )}
    </div>
  );
};
