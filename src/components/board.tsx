import { useState } from "react"
import Piece from "./piece"
import Row from "./row"
import Dot from "./dot"
import {ChessGame} from "../chess/chessgame"
import * as _ from "../chess/piece"

function Board(){

    const chessGame = ChessGame.getInstance()

    const [pieces, updatePieces] = useState(
        chessGame.board.flat()
            .filter(p => Boolean(p))
            .map(p => Piece(p, select, update))
    )    
    const [dots, setDots] = useState([] as JSX.Element[])

    

    function select(id: string, onDotClicked: (i:number, j:number) => void, piece?: _.Piece){

        console.log(id)

        const S = document.querySelectorAll(".selected")
        S.forEach(s => s.classList.remove("selected"))
        setDots(() => [])

        
        if(!piece) return

        const p = document.getElementById(id)!
        p.classList.add("selected")
        const dots_ = piece.findPossibleMoves()
            .map(n => [Math.floor(n/8), n%8])
            .map(a => Dot(a[0], a[1], onDotClicked))

        setDots(()=> dots_)
        chessGame.selected = piece
        
        
    }

    function update(i: number, j: number){
        const board = chessGame.move(i, j)!
        updatePieces(
            () => board.flat()
                .filter(p => Boolean(p))
                .map(p => Piece(p, select, update))
        )
    }
    
    const rows = []
    for(let i=0; i<8; i++){
        rows.push(Row(i))
    }

    return <div 
        id="board"
    >
        {dots}
        {pieces}
        {rows}
    </div>
}

export default Board