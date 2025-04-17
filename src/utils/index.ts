import { GridRef } from "../components/grid";
import { BoardChecks, BoardSize } from "../consts";
import { BoardType, CheckType, GameState, GridType, PieceType } from "../types";

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
  for (const check of BoardChecks) {
    win = true;
    for (const [i, j] of check) {
      if (board[i][j] !== piece) {
        win = false;
        break;
      }
    }
    if (win) {
      return getPieceWinGameState(piece);
    }
  }

  if (!getBoardHasEmpty(board)) {
    return GameState.Draw;
  }

  return GameState.Going;
};

export const getBoardChecks = (): CheckType[] => {
  const checks: CheckType[] = [];

  let i = 0,
    j = 0;

  for (i = 0; i < BoardSize; i++) {
    const check: CheckType = [];
    for (j = 0; j < BoardSize; j++) {
      check.push([i, j]);
    }
    checks.push(check);
  }

  for (j = 0; j < BoardSize; j++) {
    const check: CheckType = [];
    for (i = 0; i < BoardSize; i++) {
      check.push([i, j]);
    }
    checks.push(check);
  }

  for (const getJ of [(i: number) => i, (i: number) => BoardSize - 1 - i]) {
    const check: CheckType = [];
    for (i = 0; i < BoardSize; i++) {
      check.push([i, getJ(i)]);
    }
    checks.push(check);
  }

  return checks;
};

export const getBoardThreats = (
  board: BoardType,
  piece: PieceType
): GameState => {
  let threats = 0;

  let pieces = 0;
  let empties = 0;

  for (const check of BoardChecks) {
    pieces = 0;
    empties = 0;
    for (const [i, j] of check) {
      if (board[i][j] === piece) {
        pieces++;
      } else if (board[i][j] === GridType.Empty) {
        empties++;
      }
    }
    if (pieces === BoardSize - 1 && empties === 1) {
      threats++;
    }
  }

  return threats;
};

export const getBoardHasEmpty = (board: BoardType) => {
  let hasEmpty = false;
  outer: for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] === GridType.Empty) {
        hasEmpty = true;
        break outer;
      }
    }
  }
  return hasEmpty;
};

export const getBoardAllEmpty = (board: BoardType) => {
  let allEmpty = true;
  outer: for (let i = 0; i < BoardSize; i++) {
    for (let j = 0; j < BoardSize; j++) {
      if (board[i][j] !== GridType.Empty) {
        allEmpty = false;
        break outer;
      }
    }
  }
  return allEmpty;
};
