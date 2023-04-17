import "./style/guide.css"

function Dot(
    loc: number,
    onClick: (arg0: number, arg1: number) => void
){

    const [i, j] = [Math.floor(loc/8), loc%8]

    const ID = "d"+loc

    return <div 
        className={"guide"} 
        style={{top:i*64, left:j*64}}
        key={ID} id={ID}
        onClick={() => onClick(i, j)}
        >
        <div className="dot"></div> 
    </div>
    
}

export default Dot