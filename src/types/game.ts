export enum Player {
  One = "Player One (Red)",
  Two = "Player Two (Yellow)",
}
export const ROWS = 6;
export const COLS = 7;
export const WINNING_COUNT = 4;
export const baseBoardState: Board = Array.from({ length: COLS }, () =>
  Array(ROWS).fill(null)
);

export type BoardCell = Player | null;

export type Board = BoardCell[][];

export const initialGameState: GameState = {
  board: baseBoardState,
  currentPlayer: Player.One,
  isGameOver: false,
  winner: null,
};

export interface GameState {
  board: Board;
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
}

export type MakeMoveAction = {
  type: "MAKE_MOVE";
  payload: {
    // Индекс колонки, куда совершается ход
    colIndex: number;
  };
};

export type ResetGameAction = {
  type: "RESET_GAME";
};

export type ToggleModalAction = {
  type: "TOGGLE_MODAL";
  payload: {
    isOpen: boolean;
  };
};

// Объединение всех возможных действий
export type GameAction = MakeMoveAction | ResetGameAction | ToggleModalAction;
