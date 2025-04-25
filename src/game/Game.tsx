import './Game.css';
import Board from "./Board"
import { useRef, useState } from "react";
import { BoardValue } from "./game.types";
import Banner from "./Banner";

function checkWinnerSeq(board: BoardValue[]):  number[] | null {
    const boardSize = Math.sqrt(board.length);
    const sequencesToCheck = [];
    for (let i  = 0; i < boardSize; i++) {
        sequencesToCheck.push(new Array(boardSize).fill(0).map((_, j) => boardSize * i + j))
        sequencesToCheck.push(new Array(boardSize).fill(0).map((_, j) => i + boardSize * j))
    }
    sequencesToCheck.push(new Array(boardSize).fill(0).map((_, i) => boardSize * i + i))
    sequencesToCheck.push(new Array(boardSize).fill(0).map((_, i) => boardSize * i + boardSize - i - 1))

    for (const sequence of sequencesToCheck) {
        const check = sequence.reduce((acc, curr) => acc && (board[curr] === board[sequence[0]]), board[sequence[0]] !== null);
        if (check) return sequence;
    }

    return null;
}

export default function Game() {

    const boardSize = 3;
    const numMoves = boardSize;

    const [lastMovesByPlayer, setLastMovesByPlayer] = useState<number[][]>([new Array(numMoves).fill(null), new Array(numMoves).fill(null)]);
    const nextMove = useRef<BoardValue>('X');

    const board = new Array(boardSize * boardSize).fill(null);
    lastMovesByPlayer.forEach((moves, playerIndex) => {
        moves.forEach((move) => {
            board[move] = playerIndex === 0 ? 'X' : 'O';
        });
    });

    const earliestMoves = lastMovesByPlayer.map(moves => moves[0]);

    const winnerSeq = checkWinnerSeq(board);

    function onMove(i: number) {
        if (winnerSeq || board[i] !== null) return;

        const playerIndex = nextMove.current === 'X' ? 0 : 1;
        const lastMoves = [...lastMovesByPlayer];
        lastMoves[playerIndex].push(i);
        if (lastMoves[playerIndex].length > numMoves) {
            lastMoves[playerIndex].shift();
        }

        nextMove.current = nextMove.current === 'X' ? 'O' : 'X';
        setLastMovesByPlayer(lastMoves);
    }

    function onReset() {
        nextMove.current = 'X';
        setLastMovesByPlayer([new Array(numMoves).fill(null), new Array(numMoves).fill(null)])
    }

    return (
        <div className="t4Game">
            <h1> Twisted Tic-Tac-Toe</h1>
            <Banner nextMove={nextMove.current} winner={winnerSeq ? board[winnerSeq[0]] : null} onReset={onReset}/>
            <Board nextMove={nextMove.current} board={board} winnerSeq={winnerSeq} earliestMoves={earliestMoves} onMove={onMove}/>
        </div>
    )
}