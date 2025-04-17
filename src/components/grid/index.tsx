import { forwardRef, useCallback, useImperativeHandle } from "react";
import { GridTypeTextMap } from "../../consts";
import { GridType, PieceType } from "../../types";
import styles from "./index.module.scss";

interface Props {
  grid: GridType;
  onGridChange: (grid: GridType) => void;
  piece: PieceType;
}

export interface GridRef {
  handleClick: () => void;
}

const Grid = forwardRef<GridRef, Props>(
  ({ grid, onGridChange, piece }, ref) => {
    const handleClick = useCallback(() => {
      if (grid !== GridType.Empty) {
        return;
      }
      onGridChange(piece);
    }, [grid, onGridChange, piece]);

    useImperativeHandle(
      ref,
      () => ({
        handleClick,
      }),
      [handleClick]
    );

    return (
      <div className={styles.grid} onClick={handleClick}>
        {GridTypeTextMap[grid]}
      </div>
    );
  }
);

export default Grid;
