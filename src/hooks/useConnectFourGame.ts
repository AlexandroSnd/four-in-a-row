import { useCallback, useEffect, useReducer } from "react";
import { gameReducer } from "../reducers/gameReducer";
import { BOT_PLAYER, GameMode, initialGameState } from "../types/game";
import { getBotMove } from "../utils/botLogic";

export const useConnectFourGame = (gameMode: GameMode) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const makeMove = useCallback((colIndex: number) => {
    dispatch({ type: "MAKE_MOVE", payload: { colIndex } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const stopBotThinking = useCallback(() => {
    dispatch({ type: "END_BOT_THINKING" });
  }, []);

  const startBotThinking = useCallback(() => {
    dispatch({ type: "START_BOT_THINKING" });
  }, []);

  const { currentPlayer, isGameOver, board, isInputBlocked } = gameState;

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
      // Если бот закончил ход, а флаг по какой-то причине остался true, сбрасываем его.
      stopBotThinking();
    }
  }, [currentPlayer, isGameOver, board, dispatch, gameMode, isInputBlocked]);

  return {
    boardState: gameState.board,
    currentPlayer: gameState.currentPlayer,
    isGameOver: gameState.isGameOver,
    winner: gameState.winner,
    isInputBlocked: gameState.isInputBlocked,
    makeMove,
    resetGame,
  };
};
