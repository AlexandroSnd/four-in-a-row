import { type Board } from "@/types/game";
import { BoardCell } from "@/components/game/BoardCell/BoardCell";
import s from "./GameBoard.module.css";
import { memo } from "react";

interface GameBoardProps {
  boardState: Board;
  onColumnClick?: (colIndex: number) => void;
  isInputBlocked: boolean;
}

export const GameBoard = memo(({ boardState, onColumnClick, isInputBlocked }: GameBoardProps) => {
  const columnClass = isInputBlocked ? s.column : `${s.column} ${s.clickableColumn}`;

  return (
    <div className={s.board}>
      {boardState.map((col, colIndex) => (
        <div
          onClick={() => onColumnClick?.(colIndex)}
          key={colIndex}
          className={columnClass}
        >
          {col.map((cell, rowIndex) => (
            <BoardCell key={rowIndex} colIndex={rowIndex} chip={cell} />
          ))}
        </div>
      ))}
    </div>
  );
});
