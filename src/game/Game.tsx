import './Game.css';
import Board from "./Board"
import { useRef, useState } from "react";
import { BoardValue } from "./game.types";
import Banner from "./Banner";

function checkWinner(board: BoardValue[][]):  BoardValue {
    console.log("Checking finished");
    const boardSize = board?.length;
    for (let i  = 0; i < boardSize; i++) {
        // Check rows
        if (board[i].every(cell => cell === board[i][0] && cell !== null)) {
            return board[i][0];
        }
        // Check columns
        if (board?.map(row => row[i]).every(cell => cell === board[0][i] && cell !== null)) {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board?.map((row, i) => row[i]).every(cell => cell === board[0][0] && cell !== null)) {
        return board[0][0]
    }
    if (board?.map((row, i) => row[boardSize - 1 - i]).every(cell => cell === board[0][boardSize - 1] && cell !== null)) {
        return board[0][boardSize - 1]
    }

    return null;
}

export default function Game() {

    const boardSize = 3;
    const [board, setBoard] = useState<BoardValue[][]>(new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null)))
    const nextMove = useRef<BoardValue>('X');
    const winner = checkWinner(board);

    function onMove(x: number, y:number) {
        if (winner || board[x][y] !== null) return;

        const newBoard = board.map(row => [...row]);
        newBoard[x][y] = nextMove.current;
        nextMove.current = nextMove.current === 'X' ? 'O' : 'X';
        setBoard(newBoard);
    }

    function onReset() {
        nextMove.current = 'X';
        setBoard(new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null)));
    }

    return (
        <div className="t4Game">
            <h1> Twisted Tic-Tac-Toe</h1>
            <Banner nextMove={nextMove.current} winner={winner} onReset={onReset}/>
            <Board board={board} onMove={onMove}/>
        </div>
    )
}