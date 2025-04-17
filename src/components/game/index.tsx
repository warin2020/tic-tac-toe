import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InitialAiPiece, InitialPiece } from "../../consts";
import { BoardType, GridType, PieceType } from "../../types";
import {
  getBoardAllEmpty,
  getFlipPiece,
  getGameState,
  getInitialBoard,
  getInitialGridsRef,
} from "../../utils";
import { getBestMoveScore } from "../../utils/ai";
import AiPieceSelect from "../ai-piece-select";
import Board from "../board";
import Meta from "../meta";
import styles from "./index.module.scss";

const Game = () => {
  const [board, setBoard] = useState<BoardType>(getInitialBoard);
  const [piece, setPiece] = useState<PieceType>(InitialPiece);
  const [aiPiece, setAiPiece] = useState<GridType>(InitialAiPiece);

  const gameState = useMemo(
    () => getGameState(board, getFlipPiece(piece)),
    [board, piece]
  );

  const handleReset = useCallback(() => {
    setBoard(getInitialBoard());
    setPiece(InitialPiece);
  }, []);

  const gridsRef = useRef(getInitialGridsRef());

  useEffect(() => {
    if (piece === aiPiece) {
      const {
        move: [rowIndex, colIndex],
      } = getBoardAllEmpty(board)
        ? {
            move: [
              Math.floor(Math.random() * 3),
              Math.floor(Math.random() * 3),
            ],
          }
        : getBestMoveScore(board, piece);
      gridsRef.current?.[rowIndex][colIndex]?.handleClick();
    }
  }, [board, piece, aiPiece]);

  return (
    <div className={styles.game}>
      <AiPieceSelect
        aiPiece={aiPiece}
        setAiPiece={setAiPiece}
        onReset={handleReset}
      />
      <Board
        board={board}
        piece={piece}
        onBoardChange={setBoard}
        onPieceChange={setPiece}
        gameState={gameState}
        gridsRef={gridsRef}
      />
      <Meta gameState={gameState} piece={piece} onReset={handleReset} />
    </div>
  );
};

export default Game;
