import { type Board, type Player } from "../types/game";


interface MoveResult {
    newBoard: Board;
    lastMove: { row: number, col: number };
}

export const getBoardAfterMove = (
    board: Board, 
    colIndex: number, 
    currentPlayer: Player
): MoveResult | null => {
    
    let rowIndex = -1;
    const column = board[colIndex];
    const numRows = column.length;

    for (let r = numRows - 1; r >= 0; r--) {
        if (column[r] === null) {
            rowIndex = r;
            break;
        }
    }

    if (rowIndex === -1) {
        return null;
    }

    const newBoard: Board = board.map((col, cIndex) => {
        if (cIndex === colIndex) {
            const newCol = [...col];
            newCol[rowIndex] = currentPlayer;
            return newCol;
        }
        return col;
    });

    return {
        newBoard,
        lastMove: { row: rowIndex, col: colIndex }
    };
};