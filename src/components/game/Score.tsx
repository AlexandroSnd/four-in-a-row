import React, { type FC } from 'react'
import { Player } from '../../types/game'

interface ScoreProps {
  score: {
    [Player.One]: number;
    [Player.Two]: number;
  };
}

export const Score: FC<ScoreProps> = ({score}) => {
  const scoreFirstPlayer = score[Player.One];
  const scoreSecondPlayer = score[Player.Two];

  return (
    <h1>{scoreFirstPlayer}:{scoreSecondPlayer}</h1>
  )
}
