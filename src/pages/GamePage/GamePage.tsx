import { GameButton } from "@/components/game/GameButton/GameButton";
import { GameBoard } from "@/components/game/GameBoard/GameBoard";
import { GameOverModal } from "@/components/game/GameOverModal/GameOverModal";
import { PlayersQueue } from "@/components/game/PlayersQueue";
import { Score } from "@/components/game/Score";
import { Timer } from "@/components/game/Timer";
import { useConnectFourGame } from "@/hooks/useConnectFourGame";
import { useGamePageFlow } from "@/hooks/useGamePageFlow";
import { Confetti } from "@neoconfetti/react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import s from "./GamePage.module.css";

export const GamePage = () => {
  const location = useLocation();
  const gameMode = location.state?.gameMode;

  const gameApi = useConnectFourGame(gameMode);

  const { isModalOpen, handleRestart, handleBackToMenu, winner } =
    useGamePageFlow(gameApi);

  const {
    boardState,
    currentPlayer,
    isGameOver,
    isInputBlocked,
    makeMove,
    score,
    timer,
    updateTimer,
  } = gameApi;

  const handlePlayerMove = useCallback(
    (colIndex: number) => {
      if (isInputBlocked) {
        return;
      }
      makeMove(colIndex);
    },
    [isInputBlocked, makeMove]
  );

  return (
    <div className={s.container}>
      <Score score={score} />
      <GameBoard
        boardState={boardState}
        onColumnClick={handlePlayerMove}
        isInputBlocked={isInputBlocked}
      />
      <Timer isGameOver={isGameOver} timer={timer} updateTimer={updateTimer} />
      <PlayersQueue currentPlayer={currentPlayer} />
      <div className={s.buttonsContainer}>
        <GameButton
          image="/restart.png"
          text="Restart"
          onClick={handleRestart}
        />
        <GameButton
          image="/back-button.png"
          text="Back to Menu"
          onClick={handleBackToMenu}
        />
      </div>
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
