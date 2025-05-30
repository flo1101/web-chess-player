import {Chessboard} from "react-chessboard"
import {useState} from "react";
import {Chess, type Move, type Square} from "chess.js";
import "./styles.scss"

const darkSquareStyle = {
    backgroundColor: "#908cbf",
    borderRadius: "5px",
}

const lightSquareStyle =  {
    backgroundColor: "#ffffff",
    margin: "0px",
    borderRadius: "5px",
}

function Player() {
    const [game, setGame] = useState<Chess>(new Chess())

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

    return <div className="player">
        <h1>Let's play some chess!</h1>
        <div className={"board"}>
            <Chessboard id="chessboard" position={game.fen()} onPieceDrop={onPieceDrop} customDarkSquareStyle={darkSquareStyle} customLightSquareStyle={lightSquareStyle}/>
        </div>
    </div>
}

export default Player;