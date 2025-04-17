import { RefObject } from "react";
import { BoardSize } from "../../consts";
import { BoardType, GameState, PieceType } from "../../types";
import { getFlipPiece } from "../../utils";
import Grid, { GridRef } from "../grid";
import styles from "./index.module.scss";

interface Props {
  board: BoardType;
  onBoardChange: (board: BoardType) => void;
  piece: PieceType;
  onPieceChange: (piece: PieceType) => void;
  gameState: GameState;
  gridsRef: RefObject<(GridRef | undefined)[][]>;
}

const Board = ({
  board,
  onBoardChange,
  piece,
  onPieceChange,
  gameState,
  gridsRef,
}: Props) => (
  <div
    className={styles.board}
    style={{
      gridTemplateColumns: `repeat(${BoardSize}, 1fr)`,
      gridTemplateRows: `repeat(${BoardSize}, 1fr)`,
    }}
  >
    {board.map((row, rowIndex) =>
      row.map((grid, colIndex) => (
        <Grid
          ref={(el) => {
            if (gridsRef.current) {
              gridsRef.current[rowIndex][colIndex] = el ?? undefined;
            }
          }}
          key={`${rowIndex}-${colIndex}`}
          grid={grid}
          onGridChange={(_grid) => {
            if (gameState !== GameState.Going) {
              return;
            }
            onBoardChange(
              board.map((row, _rowIndex) =>
                row.map((grid, _colIndex) =>
                  _rowIndex === rowIndex && _colIndex === colIndex
                    ? _grid
                    : grid
                )
              )
            );
            onPieceChange(getFlipPiece(piece));
          }}
          piece={piece}
        />
      ))
    )}
  </div>
);

export default Board;
