import Color from "./enums"

class Player {

    private _color: Color
    private _updater!: (p: Color) => void
    
    private static instace: Player

    private constructor(){
        if(!localStorage.getItem("player")){
            localStorage.setItem("player", "w")
        }
            
        this._color = localStorage.getItem("player") === "w"
            ? Color.WHITE : Color.BLACK
    }

    public static getInstance(){
        if(!this.instace)
            this.instace = new Player()
        return this.instace
    }

    public get player(){
        return this._color
    }

    public set updater(updater: (p: Color) => void){
        this._updater = updater
    }

    public change(){
        this._color = 
            (this._color === "w") ? 
            Color.BLACK : Color.WHITE
            this._updater(this._color)

        localStorage.setItem("player", this._color)
            
    }

}

export default Player