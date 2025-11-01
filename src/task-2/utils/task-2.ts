const ROWS = 6;
const COLS = 7;

type Position = [number, number];

interface WinnerInfo {
  who: 'player_1' | 'player_2';
  positions: [Position, Position, Position, Position];
}

interface StepState {
  player_1: Position[];
  player_2: Position[];
  board_state: 'waiting' | 'pending' | 'win' | 'draw';
  winner?: WinnerInfo;
}

interface GameHistory {
  [key: string]: StepState;
}

export function validator(moves: number[]): GameHistory {
  const history: GameHistory = {
    step_0: {
      player_1: [],
      player_2: [],
      board_state: 'waiting',
    },
  };

  const board: number[][] = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
  const columnHeights: number[] = Array(COLS).fill(0);
  
  let player1Positions: Position[] = [];
  let player2Positions: Position[] = [];

  const checkForWin = (lastPos: Position, player: 1 | 2): WinnerInfo | null => {
    const [r, c] = lastPos;

    const directions: [number, number][] = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];

    for (const [dr, dc] of directions) {
      for (let i = 0; i < 2; i++) {
        const directionR = i === 0 ? dr : -dr;
        const directionC = i === 0 ? dc : -dc;

        let count = 1;
        const winningPositions: Position[] = [lastPos];

        for (let j = 1; j <= 3; j++) {
          const nr = r + directionR * j;
          const nc = c + directionC * j;

          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
            count++;
            winningPositions.push([nr, nc]);
          } else {
            break;
          }
        }
        
        const reverseDirectionR = -directionR;
        const reverseDirectionC = -directionC;
        
        for (let j = 1; j <= 3; j++) {
            const nr = r + reverseDirectionR * j;
            const nc = c + reverseDirectionC * j;

            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
              count++;
              winningPositions.unshift([nr, nc]); 
            } else {
              break;
            }
        }

        if (count >= 4) {
          return {
            who: player === 1 ? 'player_1' : 'player_2',
            positions: winningPositions.slice(0, 4) as [Position, Position, Position, Position],
          };
        }
      }
    }

    return null;
  };

  const isBoardFull = (): boolean => {
    return columnHeights.every(h => h === ROWS);
  };
  
  for (let i = 0; i < moves.length; i++) {
    const col = moves[i];
    const player = (i % 2) === 0 ? 1 : 2; 
    const row = columnHeights[col];

    if (col < 0 || col >= COLS || row >= ROWS) {
      const prevStepKey = `step_${i}`;
      history[`step_${i + 1}`] = { ...history[prevStepKey] };
      continue; 
    }
    
    const currentPosition: Position = [row, col];
    board[row][col] = player;
    columnHeights[col]++;

    if (player === 1) {
      player1Positions = [...player1Positions, currentPosition];
    } else {
      player2Positions = [...player2Positions, currentPosition];
    }
    
    const winnerInfo = checkForWin(currentPosition, player);

    let boardState: 'pending' | 'win' | 'draw' = 'pending';
    
    if (winnerInfo) {
      boardState = 'win';
    } else if (isBoardFull()) {
      boardState = 'draw';
    }
    
    const stepKey = `step_${i + 1}`;
    const stepState: StepState = {
      player_1: [...player1Positions],
      player_2: [...player2Positions],
      board_state: boardState,
    };
    
    if (winnerInfo) {
      stepState.winner = winnerInfo;
    }
    
    history[stepKey] = stepState;
    
    if (boardState === 'win' || boardState === 'draw') {
        for (let j = i + 1; j < moves.length; j++) {
             history[`step_${j + 1}`] = { ...stepState };
        }
        break; 
    }
  }

  return history;
}