import { displayBoard, getPitNumber, initBoard, move, checkGameOver, getWinner } from "./utils";
import { p1, p2 } from "./consts";

const initGame = () => {
  const total = 48;

  let turn = 0;
  let activePlayer: string;

  let board = initBoard();

  while (board.p1Store + board.p2Store !== total) {
    let playAgain: boolean;
    displayBoard(board);
    activePlayer = turn % 2 === 0 ? p1 : p2;

    const pitNumber = getPitNumber({ board, player: activePlayer });

    const moveResult = move({ board, pitNumber, player: activePlayer });
    board = moveResult.board;
    playAgain = moveResult.playAgain;

    // change turn
    if (!playAgain) {
      turn += 1;
    }

    board = checkGameOver(board);
  }
  console.log(getWinner(board));
  displayBoard(board);
};

initGame();