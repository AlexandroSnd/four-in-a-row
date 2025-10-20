import { useEffect, useState } from "react";

interface TimerProps {
  isGameOver: boolean;
}

export const Timer = ({ isGameOver }: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isGameOver) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver]);

  if (isGameOver) {
    return <div>Final Time: {time} seconds</div>;
  }
  return <div>Timer: {time} seconds</div>;
};
