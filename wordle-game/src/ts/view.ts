import { Game } from "./game";
import { EventEmitter } from 'events'

export class View extends EventEmitter {
    private readonly okBtn: HTMLButtonElement;
    private readonly resetBtn: HTMLButtonElement;
    private readonly inp: HTMLInputElement;
    private cellsView: HTMLDivElement[][] = [];
    private readonly gameOver = document.getElementById("game-over") as HTMLHeadingElement;

    constructor() {
        super();
        this.initCellsView();
        this.inp = document.getElementById('input-guess') as HTMLInputElement;
        this.okBtn = document.getElementById('button-ok') as HTMLButtonElement;
        this.resetBtn = document.getElementById('button-reset') as HTMLButtonElement;

        if (this.okBtn) {
            this.okBtn.addEventListener('click', () => {
                this.emit('onGuess', {value: this.inp.value});
            })
        }

        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                this.emit('onReset');
            })
        }
    }

    setInput(str: string): void {
        this.inp.value = str;
    }

    initCellsView(): void {
        for(let i = 0; i < 6; i++) {
            let row: HTMLInputElement[] = [];
            for (let j = 0; j < 5; j++) {
                let element = document.getElementById("cell-" + i + "-" + j) as HTMLInputElement
                row.push(element);
            }
            this.cellsView.push(row);
        }
    }

    renderGame(game: Game): void {
        this.setCellsView(game);
        this.inp.value = "";
        if(game.gameOver()) {
            this.gameOver.style.display = "inherit";
            this.gameOver.innerText = "GAME OVER!  " + (game.hasWon() ? "  YOU WON  " : "  YOU LOST  ")
                + "  AFTER  " + game.numOfFilledRows + "  GUESSES";
            this.okBtn.disabled = true;
            this.inp.disabled = true;
        }
    }

    setCellsView(game: Game): void {
        let i = 0;
        let filledRows = game.numOfFilledRows - 1;
        this.cellsView[filledRows].forEach(cell => {
            let boarsCell = game.cellsBoard[filledRows][i];
            cell.innerText = boarsCell.getCellContent;
            switch (boarsCell.getCellStatus) {
                case "exact":
                    cell.className = "word word-green";
                    break;
                case "exists":
                    cell.className = "word word-yellow";
                    break;
                case "wrong":
                    cell.className = "word word-gray";
                    break;
                default:
                    break;
            }
            i++;
        })
    }

    resetCellsView(): void {
        this.cellsView.forEach(cells => {
            cells.forEach(cell => {
                    cell.innerText = "";
                    cell.className = "word";
                }
            )
        })
        this.gameOver.style.display = "none";
        this.okBtn.disabled = false;
        this.inp.disabled = false;
    }

}