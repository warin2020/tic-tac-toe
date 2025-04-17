import { GameState, GridType } from "../types";

export const BoardSize = 3;

export const InitialPiece = GridType.O;

export const GridTypeTextMap: Record<GridType, string> = {
  [GridType.Empty]: "",
  [GridType.X]: "X",
  [GridType.O]: "O",
};

export const GameStateTextMap: Record<GameState, string> = {
  [GameState.Going]: "",
  [GameState.Draw]: "Draw",
  [GameState.OWin]: "O wins",
  [GameState.XWin]: "X wins",
};
