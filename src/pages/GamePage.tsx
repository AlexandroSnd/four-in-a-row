import { useState } from "react";
import { GameBoard } from "../components/game/GameBoard";
import { GameOverModal } from "../components/game/GameOverModal";
import { PlayersQueue } from "../components/game/PlayersQueue";
import { Timer } from "../components/game/Timer";
import { baseBoardState, Player, type Board } from "../types/game";
import { checkDraw, checkWin } from "../utils/checkWin";
import s from "./GamePage.module.css";


export const GamePage = () => {
  const [boardState, setBoardState] = useState<Board>(baseBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.One);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleShowModal = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    handleShowModal();
  }

  const handleMakeMove = (colIndex: number) => {
    if (isGameOver) {
      console.log("Игра окончена. Перезапустите.");
      return;
    }

    let rowIndex = -1;
    const column = boardState[colIndex];

    for (let r = column.length - 1; r >= 0; r--) {
      if (column[r] === null) {
        rowIndex = r;
        break;
      }
    }

    if (rowIndex === -1) {
      return;
    }

    const newBoard: Board = boardState.map((col, cIndex) => {
      if (cIndex === colIndex) {
        const newCol = [...col];
        newCol[rowIndex] = currentPlayer;
        return newCol;
      }
      return col;
    });

    setBoardState(newBoard);

    const lastMove = { row: rowIndex, col: colIndex };

    if (checkWin(newBoard, lastMove)) {
      console.log(`Конец игры. Победил ${currentPlayer}`);
      handleGameOver();
      return;
    }

    if (checkDraw(newBoard)) {
      console.log("Конец игры. Ничья.");
      handleGameOver();
      return;
    }

    setCurrentPlayer((p) => (p === Player.One ? Player.Two : Player.One));
  };

  return (
    <div className={s.container}>
      <GameBoard boardState={boardState} onColumnClick={handleMakeMove} />
      <Timer isGameOver={isGameOver} />
      <PlayersQueue currentPlayer={currentPlayer} />
      {isModalOpen && (
        <GameOverModal
          setIsModalShow={setIsModalOpen}
          setIsGameOver={setIsGameOver}
          setBoardState={setBoardState}
          winner={checkDraw(boardState) ? null : currentPlayer}
        />
      )}
    </div>
  );
};
