import Color from "./enums"
import c from "./enums"
import { Bishop, Horse, King, Pawn, Piece, Queen, Rook } from "./piece"


class ChessGame {

    /* ATTRIBUTES*/
    private _board: Piece[][]
    private _selected?: Piece
    /* ------------------*/


    /* SINGLRTON DESIGN PATTERN*/
    private static instance: ChessGame

    private constructor(){

        const nullRow = []
        for(let i=0; i<8; i++){
            nullRow.push(null as unknown as Piece)
        }

        this._board = []
        this._board.push(
            this._createCrew(c.BLACK),
            this._createPawns(c.BLACK)
        )

        for(let i=0; i<4; i++){
            this._board.push(
                Array.from(nullRow)
            )
        }

        this._board.push(
            this._createPawns(c.WHITE),
            this._createCrew(c.WHITE)
        )
    }

    public static getInstance(): ChessGame{
        if(!this.instance){
            this.instance = new ChessGame()
        }
        return this.instance
    }
    /* -------------------------- */

    public get board(){
        return this._board
    }

    public get selected(){
        return this._selected
    }

    public set selected(selected){
        this._selected = selected
    }

    /* ---------------------------*/

    public getPath(){
        return this._selected?.findPossibleMoves()
    }

    public move(ni: number, nj: number){
        
        console.log(this.selected)

        if(this.selected){
            const [i, j] = this.selected!.locToCoord()

            if(
                this.selected instanceof Pawn
                && (ni == 0 || ni == 7)
            ){
                this.selected = new Queen(0, this.selected.color)
            }


            this.selected.location = (ni*8 + nj)
            this.board[ni][nj] = this.selected
            this._board[i][j] = null as unknown as Piece

            const _ = this.selected instanceof Pawn

            


            return this._board
        }
        

    }

    private _createPawns(color:Color): Piece[]{

        const a = (color === Color.WHITE) ? 6 : 1

        const pawns: Piece[] = []
        for(let i=0; i<8; i++){
            pawns.push(
                new Pawn(a*8 + i, color)
            )
        }
        return pawns
    }

    private _createCrew(color:Color): Piece[]{

        const a = color === Color.WHITE ? 7 : 0
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