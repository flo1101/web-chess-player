import {Chessboard} from "react-chessboard"
import {useState} from "react";
import {Chess, type Move, type Square} from "chess.js";
import "./styles.scss"

const darkSquareStyle = {
    backgroundColor: "#c59774",
    borderRadius: "5px",
}

const lightSquareStyle =  {
    backgroundColor: "#ffffff",
    margin: "0px",
    borderRadius: "5px",
}

function Player() {
    const [game, setGame] = useState<Chess>(new Chess())
    const [fen, setFen] = useState<string>("")

    // Makes a move and updates the game state. Returns a move object or null if the move was illegal.
    function makeMove(move: Move) {
        try {
            const gameCopy: Chess = new Chess(game.fen())
            const moveResult: Move | null = gameCopy.move(move)
            setGame(gameCopy)
            return moveResult
        } catch(e) {
            return null
        }
    }

    function onPieceDrop(sourceSquare: Square, targetSquare: Square, piece: string) {
        const move = {
            from: sourceSquare,
            to: targetSquare,
            piece: piece,
        } as Move

        const moveResult: Move | null = makeMove(move)
        if (moveResult === null) {
            console.debug("Illegal move:", move)
            // TODO: Some UI feedback for illegal moves
            return false;
        }
        console.debug("Move:", moveResult)
        return true;
    }

    const resetBoard = () => {
        setGame(new Chess())
    }

    const clearBoard = () => {
        setGame(new Chess("8/8/8/8/8/8/8/8 w - - 0 1", { skipValidation: true }))
    }

    const setFenToBoard = () => {
        try {
            const newGame = new Chess(fen)
            setGame(newGame)
        } catch(e) {
            console.debug("Invalid FEN:", e)
            // TODO: Some UI feedback for invalid FENs
        }
    }

    return <div className="player">
        <div className="board">
            <div className={"board-bg"}>
                <Chessboard id="chessboard" position={game.fen()} onPieceDrop={onPieceDrop} customDarkSquareStyle={darkSquareStyle} customLightSquareStyle={lightSquareStyle}/>
            </div>
            <div className={"board-controls"}>
                <div className={"fen-upload"}>
                    <div className={"fen-upload-input"}>
                        <span>Position from FEN:</span>
                        <input className={"text-input"} type="text" placeholder={"Paste here"} onChange={(e) => setFen(e.target.value)}/>
                    </div>
                    <button className={"btn"} onClick={setFenToBoard}>Set on Board</button>
                </div>
                <button className={"btn-primary"} onClick={clearBoard}>Clear</button>
                <button className={"btn-primary"} onClick={resetBoard}>Reset</button>
            </div>
        </div>
    </div>
}

export default Player;