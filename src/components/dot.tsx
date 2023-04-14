function Dot(
    i: number, 
    j:number, 
    onClick: (arg0: number, arg1: number) => void
){

    const ID = (9*i+j)+"d"

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