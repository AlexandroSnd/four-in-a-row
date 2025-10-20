import { useReducer } from "react";
import { initialGameState } from "../types/game";
import { gameReducer } from "../reducers/gameReducer";


export const useGame = () => {
    const [game, dispatch] = useReducer(gameReducer, initialGameState);
}