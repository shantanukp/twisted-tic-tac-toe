import { BoardValue } from "./game.types";

interface boardParams {
    board: BoardValue[],
    winnerSeq: number[] | null,
    onMove: (i: number) => void
}


export default function Board({board, winnerSeq, onMove}: boardParams) {

    const boardSize = Math.sqrt(board.length);

    const boardRows = new Array(boardSize).fill(0).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
            {new Array(boardSize).fill(0).map((_, colIndex) => {
                const cellIndex = rowIndex * boardSize + colIndex;
                const isWinner = winnerSeq?.includes(cellIndex)

                return (
                    <div key={`cell-${rowIndex}#${colIndex}`} className="cell">
                        <button onClick={() => onMove(cellIndex)} className={`cellButton ${isWinner && 'winnerCell'}`}>
                            {board[cellIndex]}
                        </button>
                    </div>
                )}
            )}
        </div>
    ))

    return (
        <>
            <div className="board">
                {boardRows}
            </div>
        </>
    )
}