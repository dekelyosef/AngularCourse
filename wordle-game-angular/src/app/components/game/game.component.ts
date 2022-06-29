import {Component, OnInit, ViewChild} from '@angular/core';
import {Cell} from "../../entities/cell";
import {WORDS} from "../../entities/words";
import {TextInputComponent} from "../text-input/text-input.component";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public cells: Cell[][] = [];
  public filledRows: number = 0;
  public word: string = "";
  public isGameOver: string = "";

  @ViewChild("guessInput")
  guess = new TextInputComponent();

  @ViewChild("okBtn")
  okBtn = new ButtonComponent();

  constructor() {
    this.setWord();
    for(let i = 0; i < 6; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({content: "", status: {status: "empty"}, color: "word"});
      }
      this.cells.push(row);
    }
  }

  public ngOnInit(): void {}

  setWord(): void {
    this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  onOkClick() {
    this.guess.getValue();
    this.addGuess();
    if(this.guess.getValue() !== "") {
      if (this.gameOver()) {
        this.guess.disabled = true;
        this.okBtn.disabled = true;
        this.isGameOver = "GAME OVER!  " + (this.hasWon() ? "  YOU WON  " : "  YOU LOST  ")
          + "  AFTER  " + (this.filledRows + 1) + "  GUESSES";
      }
      this.filledRows += 1;
    }
    this.guess.setValue();
  }

  gameOver(): boolean {
    if (this.hasWon() || this.filledRows === 5) {
      return true;
    }
    return false;
  }

  hasWon(): boolean {
    let i = 0;
    this.cells[this.filledRows].forEach(cell => {
      if (cell.status.status === 'exact') {
        i++;
      }
    })
    if (i === 5) {
      return true;
    }
    return false;
  }

  onResetClick(): void {
    this.setWord();
    this.cells.forEach(row => {row.forEach(cell => {
      cell.status = {status: "empty"};
      cell.content = "";
      cell.color = "";
    })})
    this.filledRows = 0;
    this.guess.setValue();
    this.guess.disabled = false;
    this.okBtn.disabled = false;
    this.isGameOver = "";
  }

  addGuess(): void {
    if (this.guess.getValue().length === 5 && /^[a-z]+$/.test(this.guess.getValue()) && this.isLegalWord()) {
      let i = 0;
      this.cells[this.filledRows].forEach(cell => {
        let char = this.guess.getValue().charAt(i);
        cell.content = char;
        switch (char) {
          case this.word.charAt(i):
            cell.status = {status: "exact"};
            cell.color = "green";
            break;
          case this.isExists(this.word, char):
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
    } else {
      this.guess.setValue();
    }
  }

  isLegalWord(): boolean {
    let legal = false;
    WORDS.forEach(word => {
      if (word === this.guess.getValue()) {
        legal = true;
      }
    })
    return legal;
  }

  isExists(word: string, char: string): string {
    if (word.includes(char)) {
      return char;
    }
    return "";
  }

}
