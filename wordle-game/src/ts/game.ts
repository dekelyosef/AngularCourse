import { Cell } from "./cell";
import { WORDS } from "./words";

export class Game {
    private cells: Cell[][] = [];
    private filledRows: number = 0;
    private guess = "";
    private word = "";

    constructor() {
        this.setWord();
        for(let i = 0; i < 6; i++) {
            let row: Cell[] = [];
            for (let j = 0; j < 5; j++) {
                row.push(new Cell("empty", ""));
            }
            this.cells.push(row);
        }
    }

    get cellsBoard(): Cell[][] {
        return this.cells;
    }

    get numOfFilledRows() : number {
        return this.filledRows;
    }

    setWord(): void {
        this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    gameOver(): boolean {
        if (this.hasWon()) {
            return true;
        } else {
            if (this.filledRows === 6) {
                return true;
            }
        }
        return false;
    }

    hasWon(): boolean {
        let i = 0;
        this.cells[this.filledRows - 1].forEach(cell => {
            if (cell.getCellStatus === "exact") {
                i++;
            }
        })
        if (i === 5) {
            return true;
        }
        return false;
    }

    reset(): void {
        this.setWord();
        this.cells.forEach(row => {row.forEach(cell => { cell.setCellStatus = "empty"; cell.setCellContent = "";})})
        this.filledRows = 0;
        this.guess = "";
    }

    addGuess(guess: string): void {
        this.guess = guess;
        let i = 0;
        this.cells[this.filledRows].forEach(cell => {
            let char = this.guess.charAt(i);
            cell.setCellContent = char;
            switch (char) {
                case this.word.charAt(i):
                    cell.setCellStatus = "exact";
                    break;
                case this.isExists(this.word, char):
                    cell.setCellStatus = "exists";
                    break;
                default:
                    cell.setCellStatus = "wrong";
                    break;
            }
            i++;
        })
        this.filledRows += 1;
    }

    isExists(word: string, char: string): string {
        if (word.includes(char)) {
            return char;
        }
        return "";
    }

}