import { memo } from "react";

interface PlayersQueueProps {
  currentPlayer: string;
}

export const PlayersQueue = memo(({ currentPlayer }: PlayersQueueProps) => {
  return <div>Current Player: {currentPlayer}</div>;
});