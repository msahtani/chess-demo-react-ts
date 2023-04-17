import { useState } from "react"
import { ChessGame } from "../chess/chessgame"
import Player from "../chess/player"
import "./style/status.css"


function Status(moves: number, player: string){

    
    return <div id="status">
        <p> moves : { moves }</p>
        <p> { player }</p>        
    </div>

}

export default Status