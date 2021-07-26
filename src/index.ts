import { displayBoard, getPitNumber, initBoard } from "./utils";
import { p1, p2 } from "./consts";

const initGame = () => {
  const total = 48;

  let turn = 0;
  let activePlayer: string;

  const board = initBoard();

  while (board.p1Store + board.p2Store !== total) {
    displayBoard(board);

    activePlayer = turn % 2 === 0 ? p1 : p2;

    const index = getPitNumber({ board, player: activePlayer });

    // change turn
    turn += 1;
  }
};

initGame();