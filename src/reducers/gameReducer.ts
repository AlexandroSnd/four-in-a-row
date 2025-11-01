import {
  initialGameState,
  Player,
  type GameAction,
  type GameState,
} from "../types/game";
import { checkDraw, checkWin } from "../utils/checkWin";
import { getBoardAfterMove } from "../utils/getBoardAfterMove";


export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "START_BOT_THINKING":
      return {
        ...state,
        isInputBlocked: true,
      };

    case "END_BOT_THINKING":
      return {
        ...state,
        isInputBlocked: false,
      };
    case "MAKE_MOVE": {
      const { board, currentPlayer, isGameOver } = state;
      const { colIndex } = action.payload;

      if (isGameOver) {
        return state;
      }

      const moveResult = getBoardAfterMove(board, colIndex, currentPlayer);

      if (!moveResult) {
        return state;
      }

      const { newBoard, lastMove } = moveResult;

      const isWin = checkWin(newBoard, lastMove);
      const isDraw = !isWin && checkDraw(newBoard);

      if (isWin || isDraw) {
        return {
          ...state,
          board: newBoard,
          isGameOver: true,
          winner: isWin ? currentPlayer : null,
          score: isWin
            ? {
                ...state.score,
                [currentPlayer]: state.score[currentPlayer] + 1,
              }
            : state.score,
        };
      }

      // Если игра продолжается, меняем игрока и обновляем доску
      return {
        ...state,
        board: newBoard,
        currentPlayer: currentPlayer === Player.One ? Player.Two : Player.One,
      };
    }
    case "RESET_PARTY": {
      return {
        ...initialGameState,
        score: state.score,
      };
    }
    case "RESET_GAME": {
      return initialGameState;
    }
    case "UPDATE_TIMER": {
      return {
        ...state,
        timer: action.payload.timer,
      };
    }

    default:
      return state;
  }
};
