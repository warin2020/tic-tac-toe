import { GameState, GridType } from "../types";

export const BoardSize = 3;

export const InitialPiece = GridType.O;

export const InitialAiPiece = GridType.Empty;

export const GridTypeTextMap: Record<GridType, string> = {
  [GridType.Empty]: "",
  [GridType.X]: "X",
  [GridType.O]: "O",
};

export const GameStateTextMap: Record<GameState, string> = {
  [GameState.Going]: "",
  [GameState.Draw]: "平局",
  [GameState.OWin]: "O胜利",
  [GameState.XWin]: "X胜利",
};

export const GridTypeAiPieceTextMap: Record<GridType, string> = {
  [GridType.Empty]: "无AI",
  [GridType.O]: "AI先手",
  [GridType.X]: "AI后手",
};
