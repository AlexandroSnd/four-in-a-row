import { Player } from "@/types/game";
import { memo } from "react";

interface ScoreProps {
  score: {
    [Player.One]: number;
    [Player.Two]: number;
  };
}

export const Score = memo(({ score }: ScoreProps) => {
  const scoreFirstPlayer = score[Player.One];
  const scoreSecondPlayer = score[Player.Two];

  return (
    <h1>
      {scoreFirstPlayer}:{scoreSecondPlayer}
    </h1>
  );
});
