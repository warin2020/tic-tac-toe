import { GameStateTextMap, GridTypeTextMap } from "../../consts";
import { GameState, PieceType } from "../../types";
import styles from "./index.module.scss";

interface Props {
  gameState: GameState;
  piece: PieceType;
  onReset: () => void;
}

const Meta = ({ gameState, piece, onReset }: Props) => (
  <div className={styles.meta}>
    {gameState === GameState.Going
      ? `${GridTypeTextMap[piece]}的回合`
      : GameStateTextMap[gameState]}
    <button
      style={{
        visibility: gameState === GameState.Going ? "hidden" : "visible",
      }}
      onClick={onReset}
    >
      new game
    </button>
  </div>
);

export default Meta;
