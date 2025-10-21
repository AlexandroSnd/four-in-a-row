// src/hooks/useGamePageFlow.ts

import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../types/app";
import { GameMode, type Player } from "../types/game";

interface GameHookAPI {
  isGameOver: boolean;
  resetGame: () => void;
  winner: Player | null;
  resetParty: () => void;
}

export const useGamePageFlow = (gameHookApi: GameHookAPI) => {
  const { isGameOver, resetGame, winner, resetParty } = gameHookApi;

  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const gameMode = (location.state?.gameMode || GameMode.PVP) as GameMode;

  const handleBackToMenu = useCallback(() => {
    navigate(AppRoutes.GameMode);
    resetGame();
  }, [navigate, resetGame]);

  const handleRestart = useCallback(() => {
    setIsModalOpen(false);
    resetParty();
  }, [resetParty]);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    } else if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isGameOver, isModalOpen]);

  return {
    gameMode,
    isModalOpen,
    handleRestart,
    handleBackToMenu,
    winner,
  };
};
