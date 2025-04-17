import { GridRef } from "../components/grid";
import { BoardSize } from "../consts";
import { BoardType, GameState, GridType, PieceType } from "../types";

export const getInitialBoard = (): BoardType =>
  Array(BoardSize)
    .fill(0)
    .map(() => Array(BoardSize).fill(GridType.Empty));

export const getInitialGridsRef = (): (GridRef | undefined)[][] =>
  Array(BoardSize)
    .fill(0)
    .map(() => Array(BoardSize).fill(undefined));

export const getFlipPiece = (piece: PieceType) =>
  piece === GridType.O ? GridType.X : GridType.O;

export const getPieceWinGameState = (piece: PieceType): GameState =>
  piece === GridType.O ? GameState.OWin : GameState.XWin;

export const getGameState = (board: BoardType, piece: PieceType): GameState => {
  let win = false;

  for (let i = 0; i < BoardSize; i++) {
    win = true;
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] !== piece) {
        win = false;
        break;
      }
    }
    if (win) {
      return getPieceWinGameState(piece);
    }
  }

  for (let j = 0; j < BoardSize; j++) {
    win = true;
    for (let i = 0; i < BoardSize; i++) {
      if (board[i][j] !== piece) {
        win = false;
        break;
      }
    }
    if (win) {
      return getPieceWinGameState(piece);
    }
  }

  win = true;
  for (let i = 0; i < BoardSize; i++) {
    if (board[i][i] !== piece) {
      win = false;
      break;
    }
  }
  if (win) {
    return getPieceWinGameState(piece);
  }

  win = true;
  for (let i = 0; i < BoardSize; i++) {
    if (board[i][BoardSize - i - 1] !== piece) {
      win = false;
      break;
    }
  }
  if (win) {
    return getPieceWinGameState(piece);
  }

  let hasEmpty = false;
  for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] === GridType.Empty) {
        hasEmpty = true;
      }
    }
  }
  if (!hasEmpty) {
    return GameState.Draw;
  }

  return GameState.Going;
};
