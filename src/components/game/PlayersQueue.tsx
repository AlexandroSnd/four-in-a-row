interface PlayersQueueProps {
  currentPlayer: string;
}

export const PlayersQueue = ({ currentPlayer }: PlayersQueueProps) => {
  return <div>Current Player: {currentPlayer}</div>;
};