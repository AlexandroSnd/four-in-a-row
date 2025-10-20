import { type Board } from "../../../types/game";
import { BoardCell } from "../BoardCell/BoardCell";
import s from "./GameBoard.module.css";

interface GameBoardProps {
  boardState: Board;
  onColumnClick?: (colIndex: number) => void;
}

export const GameBoard = ({ boardState, onColumnClick }: GameBoardProps) => {
  console.log(boardState);

  return (
    <div className={s.board}>
      {boardState.map((col, colIndex) => (
        <div
          onClick={() => onColumnClick?.(colIndex)}
          key={colIndex}
          className={s.column}
        >
          {col.map((cell, rowIndex) => (
            <BoardCell key={rowIndex} colIndex={rowIndex} chip={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};
