 
import { COLS, ROWS, type Board } from "../types/game";

export const checkWin = (board: Board, lastMove: { row: number, col: number }): boolean => {
    const { row, col } = lastMove;
    const player = board[col][row];

    if (!player) return false;

    const checkLine = (dr: number, dc: number): boolean => {
        let count = 1;

        for (let i = 1; i < 4; i++) {
            const c = col + dc * i;
            const r = row + dr * i;
            if (c >= 0 && c < COLS && r >= 0 && r < ROWS && board[c][r] === player) {
                count++;
            } else {
                break;
            }
        }
        
        for (let i = 1; i < 4; i++) {
            const c = col - dc * i;
            const r = row - dr * i;
            if (c >= 0 && c < COLS && r >= 0 && r < ROWS && board[c][r] === player) {
                count++;
            } else {
                break;
            }
        }
        return count >= 4;
    };

    // Направления для проверки:
    // 1. Горизонталь
    if (checkLine(0, 1)) return true;
    // 2. Вертикаль
    if (checkLine(1, 0)) return true;
    // 3. Диагональ
    if (checkLine(1, 1)) return true;
    // 4. Антидиагональ
    if (checkLine(1, -1)) return true;

    return false;
};


export const checkDraw = (board: Board): boolean => {
    return board.every(col => col.every(cell => cell !== null));
};