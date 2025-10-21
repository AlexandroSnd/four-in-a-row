export enum Player {
  One = "Player One (Red)",
  Two = "Player Two (Yellow)",
}
export enum GameMode {
  PVP = "PVP",
  PVE = "PVE",
}

export const BOT_PLAYER = Player.Two;
export const HUMAN_PLAYER = Player.One;

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
  isInputBlocked: false,
  score: { [Player.One]: 0, [Player.Two]: 0 },
};

export interface GameState {
  board: Board;
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
  isInputBlocked: boolean;
  score: Record<Player, number>;
}

export type ResetPartyAction = {
  type: "RESET_PARTY";
};

export type ChangeGameModeAction = {
  type: "CHANGE_GAME_MODE";
  payload: {
    gameMode: GameMode;
  };
};

export type MakeMoveAction = {
  type: "MAKE_MOVE";
  payload: {
    // Индекс колонки, куда совершается ход
    colIndex: number;
  };
};

export type UpdateScoreAction = {
  type: "UPDATE_SCORE";
  payload: {
    winner: Player | null;
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

export type StartBotThinkingAction = {
  type: "START_BOT_THINKING";
};

export type EndBotThinkingAction = {
  type: "END_BOT_THINKING";
};

// Объединение всех возможных действий
export type GameAction =
  | MakeMoveAction
  | ResetGameAction
  | ToggleModalAction
  | ChangeGameModeAction
  | StartBotThinkingAction
  | EndBotThinkingAction
  | UpdateScoreAction
  | ResetPartyAction;
