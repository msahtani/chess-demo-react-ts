
import React from "react"
import * as _ from "../chess/piece"
import "./style/piece.css"



function Piece(
    p: _.Piece, 
    onSelect: (arg0: string, arg1: (i:number, j:number) => void, arg2?: _.Piece) => void,
    onUpdate: (arg0: number, arg1: number) => void
)
{ 
    
    const [x, y] = p.locToCoord()


    const ID = p.id! + p.location


    function move(i: number, j:number){
        onSelect(ID, () => {})
        onUpdate(i, j)
    }

    function update(ev: React.MouseEvent){

        // TODO: generate dots for this piece
        const self = document.getElementById(ID)!
        if(!self.classList.contains("selected"))
            onSelect(ID, move, p)
        else
            onSelect(ID, move)
    }


    return <div 
        className={"piece"} 
        style={{top:x*64, left:y*64}}
        key={ID} id={ID}
        onClick={update}
        >
        
            <img src={`assets/img/${p.id!}.png`}/>
        
    </div>
}

export default Piece

