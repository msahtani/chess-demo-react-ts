
import Color from "./enums"
import {ChessGame} from "./chessgame"
import dirs from "./directions.json"

abstract class Piece{

    protected _color: Color
    protected _loc: number
    protected _id: string
    protected _mulStep: boolean
    protected _dirs: number[][]

    constructor(
        loc: number, 
        color: Color,
        label: string, 
        dirs: number[][],
        mulStep = false
        
    ){
        this._loc = loc
        this._color = color
        this._dirs = dirs
        this._id = label+this._color
        this._mulStep = mulStep
    }

    get color(){
        return this._color
    }

    get id(){
        return this._id
    }

    get location(){
        return this._loc
    }

    set location(loc: number){
        this._loc = loc
    }

    
    public findPossibleMoves(): number[] {
        const board = ChessGame.getInstance().board

        const range = [0,1,2,3,4,5,6,7]
        const possibleMoves: number[] = []
        const [i, j] = this.locToCoord()

        for(let d of this._dirs){
            let [dx, dy] = d
            let a = 1
            while(true){
                let [x, y] = [i+a*dx, j+a*dy]

                if(!(x in range && y in range))
                    break

                let p = board[x][y]

                if(p){
                    if(p.color !== this._color){
                        possibleMoves.push(x*8+y)
                    }
                    break
                }

                possibleMoves.push(x*8+y)

                if(!this._mulStep) break
                a++
            }
        }

        return possibleMoves
    }

    public locToCoord(){
        return [Math.floor(this._loc/8), this._loc%8]
    }
}

class Pawn extends Piece{


    constructor(loc:number, color: Color){
        super(loc, color, "p", null as unknown as number[][])
    }

    public findPossibleMoves(): number[] {
        
        const board = ChessGame.getInstance().board
        const [i, j] = this.locToCoord()
        const possibleMoves: number[] = []

        const d = this.color === Color.WHITE ? -1: 1

        let p = board[i+d][j]
        if(!p){
            possibleMoves.push((i+d)*8 + j)
        }

        if(
            (i === 6 && this.color === Color.WHITE) ||
            (i === 1 && this.color === Color.BLACK)
        ){
            possibleMoves.push((i+2*d)*8 + j)
        }

        if(j-1>=0){
            p = board[i+d][j-1]
            if(p && p.color !== this.color){
                possibleMoves.push((i+d)*8+j-1)
            }
        }

        if(j+1<8){
            p = board[i+d][j+1]
            if(p && p.color !== this.color){
                possibleMoves.push((i+d)*8+j+1)
            }
        }

        return possibleMoves;
    }
    
}


class Horse extends Piece{
    constructor(loc:number, color: Color){
        super(loc, color, "h", dirs.h)
    }

}

class Bishop extends Piece{
    constructor(loc:number, color: Color){
        super(loc, color, "b", dirs.b, true)
    }

}

class Rook extends Piece{
    constructor(loc:number, color: Color){
        super(loc, color, "r", dirs.r, true)
    }

    public findPossibleMoves(): number[] {

        const board = ChessGame.getInstance().board

        const range = [0,1,2,3,4,5,6,7]
        const possibleMoves: number[] = []
        const [i, j] = this.locToCoord()
        const factor = [[0,-1], [0, 1], [1, 0], [-1,0]]

        for(let f of factor){
            let [fx, fy] = f
            let a = 1
            while(true){
                let [x, y] = [i+a*fx, j+a*fy]

                if(!(x in range) || !(y in range))
                    break

                let p = board[x][y]

                if(p){
                    if(p.color !== this._color){
                        possibleMoves.push(x*8+y)
                    }
                    break
                }

                possibleMoves.push(x*8+y)
                a++
            }
        }

        return possibleMoves

    }
}



class King extends Piece{
    constructor(loc:number, color: Color){
        super(loc, color, "k", [...dirs.b, ...dirs.r])
    }
}

class Queen extends Piece{
    constructor(loc:number, color: Color){
        super(loc, color, "q", [...dirs.b, ...dirs.r],true)
    }
}

export {
    Piece, Pawn, Horse, Bishop, Rook, Queen, King
}