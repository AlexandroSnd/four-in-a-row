import { type Board, BOT_PLAYER, HUMAN_PLAYER } from "@/types/game";
import { checkWin } from "./checkWin"; 
import { getBoardAfterMove } from "./getBoardAfterMove";

export const getBotMove = (board: Board): number | null => {
    const availableCols = board
        .map((col, index) => ({ col, index }))
        .filter(item => item.col.includes(null))
        .map(item => item.index);
    
    if (availableCols.length === 0) return null;

    for (const colIndex of availableCols) {
        const simulatedBoard = getBoardAfterMove(board, colIndex, BOT_PLAYER)?.newBoard;
        if (simulatedBoard) {
            const rowIndex = simulatedBoard[colIndex].lastIndexOf(BOT_PLAYER);
            
            if (rowIndex !== -1 && checkWin(simulatedBoard, { row: rowIndex, col: colIndex })) {
                return colIndex;
            }
        }
    }

    for (const colIndex of availableCols) {
        const simulatedBoard = getBoardAfterMove(board, colIndex, HUMAN_PLAYER)?.newBoard;
        if (simulatedBoard) {
            const rowIndex = simulatedBoard[colIndex].lastIndexOf(HUMAN_PLAYER);

            if (rowIndex !== -1 && checkWin(simulatedBoard, { row: rowIndex, col: colIndex })) {
                return colIndex;
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * availableCols.length);
    return availableCols[randomIndex];
};