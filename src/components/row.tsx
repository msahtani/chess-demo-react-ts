import Square from "./square"

function Row(i:number){

    const squares = []
    for(let j=0; j<8; j++){
        squares.push(Square(i, j))
    }

    return <div 
        className="row"
        key={"r" + i}
    >{squares}</div>
}

export default Row