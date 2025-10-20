import type { GameAction, GameState } from "../types/game";

export const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case "MAKE_MOVE":
      return state;
    default:
      return state;
  }
};
