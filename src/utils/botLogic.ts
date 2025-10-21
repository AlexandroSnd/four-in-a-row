// src/utils/botLogic.ts
import { type Board } from "../types/game";

export const getBotMove = (board: Board): number | null => {
    // 1. Найти все доступные для хода колонки
    const availableCols = board
        .map((col, index) => ({ col, index }))
        .filter(item => item.col.includes(null)) 
        .map(item => item.index);
    
    if (availableCols.length === 0) {
        return null;
    }

    // 2. Логика бота: случайный ход
    const randomIndex = Math.floor(Math.random() * availableCols.length);
    return availableCols[randomIndex];
};