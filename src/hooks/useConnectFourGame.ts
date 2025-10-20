// src/hooks/useConnectFourGame.ts
import { useReducer, useCallback } from 'react';
import { initialGameState } from '../types/game';
import { gameReducer } from '../reducers/gameReducer';

export const useConnectFourGame = () => {
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

    const makeMove = useCallback((colIndex: number) => {
        dispatch({ type: 'MAKE_MOVE', payload: { colIndex } });
    }, []);

    const resetGame = useCallback(() => {
        dispatch({ type: 'RESET_GAME' });
    }, []);



    return {
        boardState: gameState.board,
        currentPlayer: gameState.currentPlayer,
        isGameOver: gameState.isGameOver,
        winner: gameState.winner,
        makeMove,
        resetGame,
    };
};