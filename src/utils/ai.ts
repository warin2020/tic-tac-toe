import { getFlipPiece, getGameState, getPieceWinGameState } from ".";
import { BoardSize } from "../consts";
import { BoardType, GameState, GridType, PieceType } from "../types";

export const getBestMoveScore = (
  board: BoardType,
  piece: PieceType
): {
  move: [number, number];
  score: number;
} => {
  let bestMove: [number, number] = [0, 0];
  let bestScore = -1;

  for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] !== GridType.Empty) {
        continue;
      }
      board[i][j] = piece;
      const gameState = getGameState(board, piece);
      let score = -1;
      if (gameState === GameState.Draw) {
        score = 0;
      } else if (gameState === getPieceWinGameState(piece)) {
        score = 1;
      } else if (gameState === GameState.Going) {
        score = -getBestMoveScore(board, getFlipPiece(piece)).score;
      }
      if (score > bestScore) {
        bestMove = [i, j];
        bestScore = score;
      }
      board[i][j] = GridType.Empty;
    }
  }

  return {
    move: bestMove,
    score: bestScore,
  };
};
