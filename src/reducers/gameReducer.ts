import {
  initialGameState,
  Player,
  type Board,
  type GameAction,
  type GameState,
} from "../types/game";
import { checkDraw, checkWin } from "../utils/checkWin";

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "MAKE_MOVE": {
      const { board, currentPlayer, isGameOver } = state;
      const { colIndex } = action.payload;

      if (isGameOver) {
        return state;
      }

      let rowIndex = -1;
      const column = board[colIndex];

      for (let r = column.length - 1; r >= 0; r--) {
        if (column[r] === null) {
          rowIndex = r;
          break;
        }
      }


      if (rowIndex === -1) {
        return state;
      }

      const newBoard: Board = board.map((col, cIndex) => {
        if (cIndex === colIndex) {
          const newCol = [...col];
          newCol[rowIndex] = currentPlayer;
          return newCol;
        }
        return col;
      });

      const lastMove = { row: rowIndex, col: colIndex };

      const isWin = checkWin(newBoard, lastMove);
      const isDraw = !isWin && checkDraw(newBoard);

      if (isWin || isDraw) {
        return {
          ...state,
          board: newBoard,
          isGameOver: true,
          winner: isWin ? currentPlayer : null,
        };
      }

      // Если игра продолжается, меняем игрока и обновляем доску
      return {
        ...state,
        board: newBoard,
        currentPlayer: currentPlayer === Player.One ? Player.Two : Player.One,
      };
    }

    case "RESET_GAME": {
      return initialGameState;
    }

    default:
      return state;
  }
};
