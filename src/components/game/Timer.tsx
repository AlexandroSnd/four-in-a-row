import { memo, useEffect } from "react";

interface TimerProps {
  isGameOver: boolean;
  timer: number;
  updateTimer: (newTime: number) => void;
}

export const Timer = memo(({ isGameOver, timer, updateTimer }: TimerProps) => {
  
  useEffect(() => {
    if (isGameOver) {
      return;
    }
    const interval = setInterval(() => {
      updateTimer(timer + 1); 
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, updateTimer, timer]);

  if (isGameOver) {
    return <div>Final Time: {timer} seconds</div>;
  }
  return <div>Timer: {timer} seconds</div>;
});