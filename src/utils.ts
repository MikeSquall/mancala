import prompt from 'prompt-sync';
import { Board } from "../types";
import { p1 } from './consts';

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
                   6     5     4     3     2     1
                +-----------------------------------+
                |  ${b6}  |  ${b5}  |  ${b4}  |  ${b3}  |  ${b2}  |  ${b1}  |
                +-----------------------------------+
                |  ${a1}  |  ${a2}  |  ${a3}  |  ${a4}  |  ${a5}  |  ${a6}  |
                +-----------------------------------+
                   1     2     3     4     5     6
                                  P1
  `);
};

const isPitIndexValid = (i: number): boolean => i >= 1 && i <= 6;

export const isPitEmpty = (r: { index: number, board: Board, player: string }): boolean => {
  const boardIndex = r.player === p1 ? 1 : 0;
  const pits = r.board.pits[boardIndex];
  const pit = pits[r.index];
  return pit === 0;
};

export const getPitNumber = (r: { player: string, board: Board }): number => {
  const { board, player } = r;
  let index: number;

  do {
    index = Number(prompt({ sigint: true })({
      ask : `${player}, which pit (integer between 1 & 6) do you want to use ?  `,
    }));
  } while (!isPitIndexValid(index) || isPitEmpty({index, board, player}));

  return index;
}

export const getOppositePitIndex = (i: number) => Math.abs(i - 6) + 1;