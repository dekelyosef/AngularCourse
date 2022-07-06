import { Injectable } from '@angular/core';
import {WORDS} from "../entities/words";
import {Cell} from "../entities/cell";
import {Board} from "../entities/board";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board: Board;
  isWinner: boolean;

  constructor() {
    this.board = this.initialBoard();
    this.isWinner = false;
  }

  initialBoard(): Board {
    let newBoard: Board = {
      cells: this.initialCells(),
      filledRows: 0,
      word: this.setWord(),
      isGameOver: false
    }
    return newBoard;
  }

  initialCells(): Cell[][] {
    let cells = [];
    for(let i = 0; i < 6; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({content: "", status: {status: "empty"}, color: "word"});
      }
      cells.push(row);
    }
    return cells;
  }

  setWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  getState(): Board {
    return this.board;
  }

  async addGuess(guess: string): Promise<Board> {
    await this.delay(3000);
    this.board = this.getNewBoard(guess);
    return this.board;
  }

  private delay(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  getNewBoard(guess: string) {
    let cells = this.board.cells;
    let i = 0;
    cells[this.board.filledRows].forEach(cell => {
      let char = guess.charAt(i);
      cell.content = char;
      switch (char) {
        case this.board.word.charAt(i):
          cell.status = {status: "exact"};
          cell.color = "green";
          break;
        case this.board.word.includes(char)? char : "":
          cell.status = {status: "exists"};
          cell.color = "yellow";
          break;
        default:
          cell.status = {status: "wrong"};
          cell.color = "gray";
          break;
      }
      i++;
    })
    let newBoard: Board = {
      cells: cells,
      filledRows: this.board.filledRows + 1,
      word: this.board.word,
      isGameOver: this.hasWon(guess)
    }
    return newBoard;
  }

  hasWon(guess: string): boolean {
    if(this.board.word === guess) {
      this.isWinner = true;
      return true;
    } else if (this.board.filledRows === 5) {
      return true;
    }
    return false;
  }

  reset() {
    this.board = this.initialBoard();
    this.isWinner = false;
  }

}
