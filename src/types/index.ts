export enum GridType {
  Empty,
  O,
  X,
}

export type PieceType = Exclude<GridType, GridType.Empty>;

export type BoardType = GridType[][];

export type PositionType = [number, number];

export type CheckType = PositionType[];

export enum GameState {
  Going,
  OWin,
  XWin,
  Draw,
}
