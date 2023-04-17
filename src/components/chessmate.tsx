import "./style/chessmate.css"

function ChessMate(_display: boolean,reset: () => void){

    const style: React.CSSProperties = {
        display: _display ? "block" : "none"
    }

    return <div style={style} id="gameover" onClick={reset}>
        <div id="block"></div>
        <div id="blockp">
            <div>
                <h1> CHESSMATE </h1>
                <p> click here to restart</p>
            </div>
        </div>
            
    </div>
}

export default ChessMate