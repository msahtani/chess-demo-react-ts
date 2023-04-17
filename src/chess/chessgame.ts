import Color from "./enums"
import c from "./enums"
import { Bishop, Horse, King, Pawn, Piece, Queen, Rook } from "./piece"
import Player from "./player"


class ChessGame {

    
    private _board: Piece[][]
    private _selected?: Piece

    private static instance: ChessGame
    private constructor(){
        this._board = new Array(8);
        
        if(!this.load())
            this.initBoard()
    }

    
    public static getInstance(): ChessGame{
        if(!this.instance){
            this.instance = new ChessGame()
        }
        return this.instance
    }


    public get board(){
        return this._board
    }

    public get selected(){
        return this._selected
    }

    public set selected(selected){
        this._selected = selected
    }


    public move(ni: number, nj: number){
        
        if(!this.selected) return
        const [i, j] = this.selected.locToCoord()

        if(
            this.selected instanceof Pawn
            && (ni === 0 || ni === 7)
        ){
            this.selected = new Queen(0, this.selected.color)
        }

        this.selected.location = ni*8 + nj
        this.board[ni][nj] = this.selected
        this._board[i][j] = null as unknown as Piece

        this.save(i*8+j)

    }


    public isChessMate(){
        return !this.findPossibleMoveForTheKing().length
            && this.isKingTheated().length !== 0
    }

    public findPossibleMoveForTheKing(){
        
        const color = Player.getInstance().player
        // find the king
        const king = this._board
            .flat()
            .filter(
                p => (p instanceof King) && p.color === color
            )
            .at(0)!

        const moves = king.findPossibleMoves()
        const [i,j] = king.locToCoord()
    
        const enemies = this._board
            .flat()
            .filter(p => Boolean(p))
            .filter(p => p.color !== color)

        this._board[i][j] = null as unknown as Piece

        const newMoves = moves.filter(
            loc => {
                const [ni, nj] = [Math.floor(loc/8), loc%8]
                let enemy: Piece = this._board[ni][nj]
                
                let danger = false
                
                // create a virtual piece
                this._board[ni][nj] = king

                for(let e of enemies){
                    if(e.findPossibleMoves().includes(loc)){
                        danger = true
                        break
                    }
                }

                this._board[ni][nj] = enemy

                return !danger
            }
        )

        this._board[i][j] = king

        return newMoves
    
    }

    public isKingTheated(){
        const color = Player.getInstance().player

        // find the king
        const king = this._board
            .flat()
            .filter(
                p => (p instanceof King) && p.color === color
            )
            .at(0)!
 
        return this._board
            .flat()
            .filter(p => Boolean(p))
            .filter(
                p => p.color !== color
            ).filter(
                p => p.findPossibleMoves().includes(king.location)
            )
    }

    public save(n?:number){

        if(n){
            localStorage.removeItem(n.toString())
            localStorage.setItem(
                this.selected!.location.toString(),
                this.selected!.id
            )
            return
        }

        localStorage.clear()
        this._board
            .flat()
            .filter(p => Boolean(p))
            .forEach(p => localStorage.setItem(p.location.toString(), p.id))
    }

    public load(): boolean{
        for(let i=0; i<8; i++){
            this._board[i] = new Array(8)
        }

        const len = localStorage.length;

        if(len === 1)
            return false
        

        for(let i=0; i<len; i++){

            let key = localStorage.key(i)!
            let code = localStorage.getItem(key)!
            let loc = parseInt(key)

            if(Number.isNaN(loc)) continue

            const [x, y] = [Math.floor(loc/8), loc%8]
            this._board[x][y] = Piece.fromCode(code, loc)
        }

        return true
    }

    public initBoard(){
        for(let i=0; i<8; i++){
            this._board[i] = new Array(8)
        }
        this._board[0] = this._createCrew(c.BLACK)
        this._board[1] = this._createPawns(c.BLACK)

        this._board[6] = this._createPawns(c.WHITE)
        this._board[7] = this._createCrew(c.WHITE)
        
        this.save()
    }


    private _createPawns(color:Color): Piece[]{

        const a = (color === "w") ? 6 : 1

        const pawns: Piece[] = []
        for(let i=0; i<8; i++){
            pawns.push(
                new Pawn(a*8 + i, color)
            )
        }
        return pawns
    }

    private _createCrew(color:Color): Piece[]{

        const a = color === "w" ? 7 : 0
        const pieceTypes = [
            Rook, Horse, Bishop, King,
            Queen, Bishop, Horse, Rook
        ]

        const crew = []
        for(let i=0; i<8; i++){
            crew.push(
                new pieceTypes[i](a*8 + i, color)
            )
        }

        return crew
    }
    
}

export {ChessGame}