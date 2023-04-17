import "./style/square.css"

function Square(i:number, j:number){

    const color = (i+j)%2 === 0 ? "yellow" : "brown"

    return(
        <div 
            className={"square " + color}
            key={"p" + (i*9+j)}
            id={"p"+(9*i+j)}
            > 
        </div>
    )
}

export default Square