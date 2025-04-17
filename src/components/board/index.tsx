import { BoardSize } from "../../consts";
import { BoardType, GameState, PieceType } from "../../types";
import { getFlipPiece } from "../../utils";
import Grid from "../grid";
import styles from "./index.module.scss";

interface Props {
  board: BoardType;
  onBoardChange: (board: BoardType) => void;
  piece: PieceType;
  onPieceChange: (piece: PieceType) => void;
  gameState: GameState;
}

const Board = ({
  board,
  onBoardChange,
  piece,
  onPieceChange,
  gameState,
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
