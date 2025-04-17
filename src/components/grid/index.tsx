import { GridTypeTextMap } from "../../consts";
import { GridType, PieceType } from "../../types";
import styles from "./index.module.scss";

interface Props {
  grid: GridType;
  onGridChange: (grid: GridType) => void;
  piece: PieceType;
}

const Grid = ({ grid, onGridChange, piece }: Props) => (
  <div
    className={styles.grid}
    onClick={() => {
      if (grid !== GridType.Empty) {
        return;
      }
      onGridChange(piece);
    }}
  >
    {GridTypeTextMap[grid]}
  </div>
);

export default Grid;
