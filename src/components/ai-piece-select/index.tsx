import { GridTypeAiPieceTextMap } from "../../consts";
import { GridType } from "../../types";

interface Props {
  aiPiece: GridType;
  setAiPiece: (aiPiece: GridType) => void;
  onReset: () => void;
}

const AiPieceSelect = ({ aiPiece, setAiPiece, onReset }: Props) => (
  <select
    value={aiPiece}
    onChange={(e) => {
      setAiPiece(Number(e.target.value));
      onReset();
    }}
  >
    {Object.values(GridType)
      .filter((v) => typeof v === "number")
      .map((gridType) => (
        <option key={gridType} value={gridType}>
          {GridTypeAiPieceTextMap[gridType]}
        </option>
      ))}
  </select>
);

export default AiPieceSelect;
