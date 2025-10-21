import { useCallback, useEffect, useReducer } from "react";
import { gameReducer } from "../reducers/gameReducer";
import { BOT_PLAYER, initialGameState, type GameMode } from "../types/game";
import { getBotMove } from "../utils/botLogic";

export const useConnectFourGame = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const makeMove = useCallback((colIndex: number) => {
    dispatch({ type: "MAKE_MOVE", payload: { colIndex } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

//   const { currentPlayer, isGameOver, board } = gameState;

//   useEffect(() => {
//     // Условие 1: Игра не окончена
//     if (isGameOver) return;

//     // Условие 2: Режим "Против Бота" И сейчас ход Бота
//     const isBotTurn = gameMode === 'PVE' && currentPlayer === BOT_PLAYER;

//     if (isBotTurn) {
//       const botDelay = setTimeout(() => {
//         const colIndex = getBotMove(board);

//         if (colIndex !== null) {
//           makeMove(colIndex);
//         }
//       }, 800);

//       return () => clearTimeout(botDelay);
//     }
//   }, [currentPlayer, isGameOver, board, dispatch, gameMode]);

  return {
    boardState: gameState.board,
    currentPlayer: gameState.currentPlayer,
    isGameOver: gameState.isGameOver,
    winner: gameState.winner,
    makeMove,
    resetGame,
  };
};
