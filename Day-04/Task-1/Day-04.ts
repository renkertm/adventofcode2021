import * as fs from 'fs';
import * as readline from 'readline';

class Board{
    private board1: number[][];
    private board2: number[][];
    private lastDraw: number;

    constructor(input: number[][]){
        this.board1 = input.map(function(arr) {
            return arr.slice();
        });
        this.board2 = input.map(function(arr) {
            return arr.slice();
        });
        for(let i = 0; i < input.length; i++){
            for(let j = 0; j < input[i].length; j++){
                this.board1[i][j] = input[i][j];
                this.board2[j][i] = input[i][j];
            }
        }
    }

    getBoards(){
        return [this.board1, this.board2];
    }

    chechDraw(draw: number){
        this.lastDraw = draw;
        for(let i = 0; i < this.board1.length; i++){
            for(let j = 0; j < this.board1[i].length; j++){
                if(this.board1[i][j] == draw) this.board1[i][j] = 99999;
            }
        }
        for(let i = 0; i < this.board2.length; i++){
            for(let j = 0; j < this.board2[i].length; j++){
                if(this.board2[i][j] == draw) this.board2[i][j] = 99999;
            }
        }
        
    }

    getUnmarkedSum(): number{
        let unmarked = [];
        let sum = 0;
        for(let i = 0; i < this.board1.length; i++){
            for(let j = 0; j < this.board1[i].length; j++){
                if(this.board1[i][j] != 99999){
                    unmarked.push(this.board1[i][j]);
                }
            }
        }
        unmarked.forEach(element => {
            sum += parseInt(element);
        });
        return sum;
    }

    checkWin(){
        for(let i = 0; i < this.board1.length; i++){
            let streak = true;
            for(let j = 0; j < this.board1[i].length; j++){
                if(this.board1[i][j] != 99999){
                    streak = false;
                    break;
                }
            }
            if(streak) return true;
        }
        for(let i = 0; i < this.board2.length; i++){
            let streak = true;
            for(let j = 0; j < this.board2[i].length; j++){
                if(this.board2[i][j] != 99999){
                    streak = false;
                    break;
                }
            }
            if(streak) return true;
        }
        return false;
        
    }

    getLastDraw(): number{
        return this.lastDraw;
    }

}

parseInputs("input.txt").then(function({draws, boards}){
    let b = false;
    draws.forEach(element => {
        boards.forEach(el => {
            el.chechDraw(parseInt(element));
            if(el.checkWin() && !b){
                let final = el.getUnmarkedSum() * el.getLastDraw();
                console.log(final);
                b = true;
            }
        });
    });
});

async function parseInputs(file: string): Promise<{ draws: any[], boards: Board[]}>{
    let filestream = fs.createReadStream(file);
    let rl = readline.createInterface({input: filestream, crlfDelay: Infinity});
    let c = 0;
    let draws = [];
    let boards = [];
    for await (let line of rl){
        if(c == 0){
            draws = line.split(",");
        }
        else if(c > 1){
            boards.push(line.replace("\n", "").split(" "));
        }
        c++;
    }
    let boardlist = [];
    let board = [];
    boards.forEach(el => {
        if(el.length == 1) {
            boardlist.push(board);
            board = [];
        }
        else{
            let row = [];
            el.forEach(element => {
                if(element != "") row.push(element);
            });
            board.push(row);
        }
    });
    let fboardlist: Board[] = [];
    boardlist.forEach(element => {
        let b = new Board(element);
        fboardlist.push(b);
    });
    return { draws : draws , boards : fboardlist};
}
