import { useState } from "react"
import Piece from "./piece"
import Row from "./row"
import Dot from "./dot"
import {ChessGame} from "../chess/chessgame"
import * as _ from "../chess/piece"
import Player from "../chess/player"
import "./style/board.css"
import ChessMate from "./chessmate"




function Board(n:number){

    const chessGame = ChessGame.getInstance()

    // use state hooks
    const [pieces, updatePieces] = useState(
        chessGame.board.flat()
            .filter(p => Boolean(p))
            .map(p => Piece(p, select, update)
        )
    )    
    const [dots, setDots] = useState([] as JSX.Element[])

    let player = Player.getInstance()


    function reset(){
        updatePieces(
            () => {
                localStorage.clear()
                chessGame.initBoard()
                return chessGame.board.flat()
                    .filter(p => Boolean(p))
                    .map(p => Piece(p, select, update)
            )}
        )
    }

    function select(
        id: string, 
        onDotClicked: (i:number, j:number) => void, 
        piece?: _.Piece
    ){
        
        const S = document.querySelectorAll(".selected")
        S.forEach(s => s.classList.remove("selected"))
        setDots([])
        
        if(!piece) return
        if(piece.color !== player.player) return
        if(chessGame.isKingTheated().length && !(piece instanceof _.King))
            return

        
        let _moves
        if(piece instanceof _.King){
            _moves = chessGame.findPossibleMoveForTheKing()
        }else{
            _moves = piece.findPossibleMoves()
        }

        if(!_moves.length) return;

        document
            .getElementById(id)!
            .classList
            .add("selected")

        setDots(
            _moves.map(
                n => Dot(n, onDotClicked)
            )
        )
        chessGame.selected = piece
        
    }


    function update(i: number, j: number){
        chessGame.move(i, j)

        updatePieces(
            () => chessGame.board.flat()
                .filter(p => Boolean(p))
                .map(p => Piece(p, select, update))
        )
        
        // change the player
        player.change()

    }
    
    const rows = []
    for(let i=0; i<8; i++){
        rows.push(Row(i))
    }

    return <div 
        id="board"
    >
        {ChessMate(chessGame.isChessMate(), reset)}
        {dots}
        {pieces}
        {rows}
    </div>
}

export default Board