import { useCallback, useEffect, useReducer } from "react";
import { gameReducer } from "../reducers/gameReducer";
import { BOT_PLAYER, GameMode, initialGameState, Player } from "../types/game";
import { getBotMove } from "../utils/botLogic";

export const useConnectFourGame = (gameMode: GameMode) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const makeMove = useCallback((colIndex: number) => {
    dispatch({ type: "MAKE_MOVE", payload: { colIndex } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const resetParty = useCallback(() => {
    dispatch({ type: "RESET_PARTY" });
  }, []);

  const stopBotThinking = useCallback(() => {
    dispatch({ type: "END_BOT_THINKING" });
  }, []);

  const startBotThinking = useCallback(() => {
    dispatch({ type: "START_BOT_THINKING" });
  }, []);

  const updateScore = useCallback((winner: Player | null) => {
    dispatch({ type: "UPDATE_SCORE", payload: { winner } });
  }, []);

  const updateTimer = useCallback((timer: number) => {
    dispatch({ type: "UPDATE_TIMER", payload: { timer } });
  }, []);

  const { currentPlayer, isGameOver, board, isInputBlocked} = gameState;

  useEffect(() => {
    if (isGameOver) return;
    const isBotTurn = gameMode === GameMode.PVE && currentPlayer === BOT_PLAYER;

    if (isBotTurn) {
      startBotThinking();

      const botDelay = setTimeout(() => {
        const colIndex = getBotMove(board);

        if (colIndex !== null) {
          makeMove(colIndex);
        }

        stopBotThinking();
      }, 800);

      return () => clearTimeout(botDelay);
    } else if (!isBotTurn && isInputBlocked) {
      stopBotThinking();
    }
  }, [
    currentPlayer,
    isGameOver,
    board,
    dispatch,
    gameMode,
    isInputBlocked,
    startBotThinking,
    stopBotThinking,
    makeMove,
  ]);

  return {
    boardState: gameState.board,
    currentPlayer: gameState.currentPlayer,
    isGameOver: gameState.isGameOver,
    winner: gameState.winner,
    isInputBlocked: gameState.isInputBlocked,
    score: gameState.score,
    timer: gameState.timer,
    makeMove,
    resetGame,
    updateScore,
    resetParty,
    updateTimer
  };
};
