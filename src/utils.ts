import prompt from 'prompt-sync';
import { Board } from "../types";
import { p1, p2 } from './consts';

export const initBoard = (): Board => {
  const pits = [
    [4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4],
  ];

  return {
    p1Store: 0,
    p2Store: 0,
    pits,
  }
};

export const displayBoard = (b: Board): void => {
  const [a1, a2, a3, a4, a5, a6] = b.pits[1];
  const [b1, b2, b3, b4, b5, b6] = b.pits[0];
  console.info(`
    store 2: ${b.p2Store}                    P2                    store 1: ${b.p1Store}
                   5     4     3     2     1     0
                +-----------------------------------+
                |  ${b1}  |  ${b2}  |  ${b3}  |  ${b4}  |  ${b5}  |  ${b6}  |
                +-----------------------------------+
                |  ${a1}  |  ${a2}  |  ${a3}  |  ${a4}  |  ${a5}  |  ${a6}  |
                +-----------------------------------+
                   0     1     2     3     4     5
                                  P1
  `);
};

const isPitIndexValid = (i: number): boolean => i >= 0 && i <= 5;

const getBoardIndex = (player: string) => player === p1 ? 1 : 0;

export const isPitEmpty = (r: { index: number, board: Board, player: string }): boolean => {
  const boardIndex = getBoardIndex(r.player);
  const pits = r.board.pits[boardIndex];
  const pit = pits[r.index];
  return pit === 0;
};

export const getPitNumber = (r: { player: string, board: Board }): number => {
  const { board, player } = r;
  let index: number;

  do {
    index = Number(prompt({ sigint: true })({
      ask : `${player}, which pit (integer between 0 & 5) do you want to use ?  `,
    }));
  } while (!isPitIndexValid(index) || isPitEmpty({index, board, player}));

  return index;
}

const getOppositePitIndex = (i: number) => Math.abs(i - 5);

export const move = (r: { pitNumber: number, player: string, board: Board }): { board: Board, playAgain: boolean} => {
  const currentBoard = {...r.board};
  const startIndex = r.player === p1 ? r.pitNumber : getOppositePitIndex(r.pitNumber);
  let currentIndex = startIndex;
  let boardIndex = getBoardIndex(r.player);
  let pitValue = r.board.pits[boardIndex][currentIndex];
  let playAgain = false;

  while (pitValue > 0) {
    pitValue -= 1;
    // const i = boardIndex;
    // console.log(currentBoard.pits[i]);
    
    if (boardIndex === 1) {
      // console.log('on line p1', currentIndex);
      if (currentIndex + 1 < 6) {
        currentBoard.pits[1][currentIndex + 1]++;
        currentIndex++;
      } else {
        // console.log('switch to p2 line');
        playAgain = pitValue === 0;
        currentBoard.p1Store++;
        boardIndex = 0;
        currentIndex = 6;
      }
    } else {
      // console.log('on line p2', currentIndex);Ò
      if (currentIndex - 1 >= 0) {
        currentBoard.pits[0][currentIndex - 1]++;
        currentIndex--;
      } else {
        // console.log('switch to p1 line');
        playAgain = pitValue === 0; 
        currentBoard.p2Store++;
        boardIndex = 1;
        currentIndex = -1;
      }
    }
    // console.log(currentBoard.pits[i]);
    // console.log('---------------------');
    
  }
  currentBoard.pits[getBoardIndex(r.player)][startIndex] = pitValue;

  return { playAgain, board: currentBoard };
};

export const getWinner = (board: Board) => {
  return board.p1Store > board.p2Store
    ? p1
    : board.p1Store === board.p2Store
      ? 'Draw'
      : p2;
};
