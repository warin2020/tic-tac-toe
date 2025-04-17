export enum GridType {
  Empty,
  O,
  X,
}

export type PieceType = Exclude<GridType, GridType.Empty>;

export type BoardType = GridType[][];

export enum GameState {
  Going,
  OWin,
  XWin,
  Draw,
}
