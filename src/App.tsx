import { useState } from 'react';
import './App.css';
import { ChessGame } from './chess/chessgame';
import Player from './chess/player';
import Board from './components/board';
import Status from './components/status';


function App() {

    const _player = Player.getInstance()
    const chessGame = ChessGame.getInstance()

    const [player, setPLayer] = useState(_player.player)
    const [moves, updateMoves] = useState(
        localStorage.getItem("moves") 
        ? parseInt(localStorage.getItem("moves")!) : 0
    )
    const [defined, setDefined] = useState(false)


    if(!defined){
        document.addEventListener("keydown", (ev) => {
            updateMoves(0)
            document
                .getElementById("gameover")!
                .click()
        })
        setDefined(true)
    }

    _player.updater = (p) => {
        setPLayer(p)
        if(chessGame.isChessMate()){
            updateMoves(0)
            return
        }
        updateMoves(m => {
            localStorage.setItem("moves", (++m).toString())
            return m
        })
        
    }


    return (
        <div className="App" id="app">
            {Status(moves, player  === "w" ? "White":"Black")}
            {Board(0)}
        </div>
    );
}

export default App;
