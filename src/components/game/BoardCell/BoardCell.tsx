import { memo } from "react";
import { Player } from "@/types/game";
import s from "./BoardCell.module.css";

interface BoardcellProps {
  colIndex: number;
  chip?: Player.One | Player.Two | null;
}

export const BoardCell = memo(({ colIndex, chip }: BoardcellProps) => {
  const playerClass =
    chip === Player.One ? s.busyMarkPlayerOne : s.busyMarkPlayerTwo;

  const chipClasses = `${s.busyMarkBase} ${playerClass}`;

  return (
    <div key={colIndex} className={s.boardcell}>
      {chip && <div className={chipClasses}></div>}
    </div>
  );
});
