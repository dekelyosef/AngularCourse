import {Component, OnInit} from '@angular/core';
import {Board} from "./entities/board";
import {GameService} from "./services/game.service";
import {WORDS} from "./entities/words";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  board: Board;
  isBusy: boolean;

  constructor(private gameService: GameService) {
    this.board = this.gameService.getState();
    this.isBusy = false;
  }

  ngOnInit(): void {}

  isGameOver(): boolean {
    return this.board.isGameOver;
  }

  getGameOverStatus() {
    return "GAME OVER!  " + (this.gameService.isWinner ? "  YOU WON  " : "  YOU LOST  ")
      + "  AFTER  " + (this.board.filledRows) + "  GUESSES";
  }

  async onResetClick() {
    this.gameService.reset();
    this.board = this.gameService.getState();
    this.isBusy = false;
  }

  async addGuess(guess: string) {
    if (guess.length === 5 && /^[a-z]+$/.test(guess) && WORDS.includes(guess)) {
      this.isBusy = true;
      this.board = await this.gameService.addGuess(guess);
      if(!this.isGameOver()) {
        this.isBusy = false;
      }
    }
  }

}
