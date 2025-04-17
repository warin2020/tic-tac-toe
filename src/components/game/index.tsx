import { useMemo, useState } from "react";
import { GameStateTextMap, GridTypeTextMap, InitialPiece } from "../../consts";
import { BoardType, GameState, PieceType } from "../../types";
import { getFlipPiece, getGameState, getInitialBoard } from "../../utils";
import Board from "../board";
import styles from "./index.module.scss";

const Game = () => {
  const [board, setBoard] = useState<BoardType>(getInitialBoard);
  const [piece, setPiece] = useState<PieceType>(InitialPiece);

  const gameState = useMemo(
    () => getGameState(board, getFlipPiece(piece)),
    [board, piece]
  );

  return (
    <div className={styles.game}>
      <Board
        board={board}
        piece={piece}
        onBoardChange={setBoard}
        onPieceChange={setPiece}
        gameState={gameState}
      />
      <div className={styles.meta}>
        {gameState === GameState.Going
          ? `${GridTypeTextMap[piece]} turn`
          : GameStateTextMap[gameState]}
        <button
          style={{
            visibility: gameState === GameState.Going ? "hidden" : "visible",
          }}
          onClick={() => {
            setBoard(getInitialBoard());
            setPiece(InitialPiece);
          }}
        >
          new game
        </button>
      </div>
    </div>
  );
};

export default Game;
