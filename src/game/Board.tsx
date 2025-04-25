import { BoardValue } from "./game.types";

interface boardParams {
    board: BoardValue[][],
    onMove: (x: number, y: number) => void
}


export default function Board({board, onMove}: boardParams) {

    const boardRows = board?.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
            {row.map((cell, cellIndex) => (
                <div key={`cell-${rowIndex}#${cellIndex}`} className="cell">
                    <button onClick={() => onMove(rowIndex, cellIndex)} className='cellButton'>
                        {cell}
                    </button>
                </div>
            ))}
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