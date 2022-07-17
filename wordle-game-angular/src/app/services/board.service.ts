import { Injectable } from '@angular/core';
import {WORDS} from "../entities/words";
import {Cell} from "../entities/cell";
import {Board} from "../entities/board";
import {BehaviorSubject, Observable} from "rxjs";
import {STATUS} from "../entities/status";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private board = this.initialBoard();
  private board$ = new BehaviorSubject<Board>(this.board);

  private isBusy = false;
  private isBusy$ = new BehaviorSubject<boolean>(this.isBusy);

  private isGameOver$ = new BehaviorSubject<boolean>(this.board.isGameOver);

  constructor() {}

  initialBoard(): Board {
    return {
      cells: this.initialCells(),
      filledRows: 0,
      word: this.setWord(),
      isGameOver: false,
      hasWon: false
    }
  }

  initialCells(): Cell[][] {
    let cells = [];
    for(let i = 0; i < 6; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        let cell: Cell = {content: "", status: "empty", color: "word"};
        row.push(cell);
      }
      cells.push(row);
    }
    return cells;
  }

  setWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  getState(): Observable<Board> {
    return this.board$.asObservable();
  }

  getIsBusy(): Observable<boolean> {
    return this.isBusy$.asObservable();
  }

  getIsGameOver(): Observable<boolean> {
    return this.isGameOver$.asObservable();
  }

  async addGuess(guess: string): Promise<void> {
    this.isBusy = true;
    this.isBusy$.next(this.isBusy);
    await this.delay(3000);
    this.board = await this.getNewBoard(guess);
    this.board$.next(this.board);
    this.isBusy = false;
    this.isBusy$.next(this.isBusy);
    this.isGameOver$.next(this.board.isGameOver);
  }

  private delay(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  async getNewBoard(guess: string): Promise<Board> {
    return { ... this.board,
      cells: this.getNewCells(guess),
      filledRows: this.board.filledRows + 1,
      isGameOver: (this.board.filledRows === 5) || this.board.word === guess,
      hasWon: this.board.word === guess
    }
  }

  getNewCells(guess: string): Cell[][] {
    let newCells = [];
    for(let i = 0; i < 6; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        if(i < this.board.filledRows) {
          let cell: Cell = this.board.cells[i][j];
          row.push(cell);
        } else if (i === this.board.filledRows) {
          let cell: Cell = this.getNewCell(j, guess);
          row.push(cell);
        } else {
          let cell: Cell = {content: "", status: "empty", color: "word"};
          row.push(cell);
        }
      }
      newCells.push(row);
    }
    return newCells;
  }

  getNewCell(i: number, guess: string): Cell {
    let newContent = guess.charAt(i);
    let newStatus: STATUS;
    let newColor = '';
    switch (newContent) {
      case this.board.word.charAt(i):
        newStatus = "exact";
        newColor = "green";
        break;
      case this.board.word.includes(newContent)? newContent : "":
        newStatus = "exists";
        newColor = "yellow";
        break;
      default:
        newStatus = "wrong";
        newColor = "gray";
        break;
    }
    return {
      content: newContent,
      status: newStatus,
      color: newColor
    }
  }

  reset(): void {
    this.board = this.initialBoard();
    this.board$.next(this.board);
    this.isBusy = false;
    this.isBusy$.next(this.isBusy);
  }

  getGameOverStatus(): string {
    return "GAME OVER!  " + (this.board.hasWon ? "  YOU WON  " : "  YOU LOST  ")
      + "  AFTER  " + (this.board.filledRows) + "  GUESSES";
  }

}
