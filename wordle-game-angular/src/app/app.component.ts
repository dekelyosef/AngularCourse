import {Component, OnInit} from '@angular/core';
import {Board} from "./entities/board";
import {BoardService} from "./services/board.service";
import {WORDS} from "./entities/words";
import {merge, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  board$!: Observable<Board>;
  guess$!: Observable<string>;
  isBusy$!: Observable<boolean>;
  isBusyAndOver$!: Observable<boolean>;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.board$ = this.boardService.getState();
    this.isBusy$ = this.boardService.getIsBusy();
    this.isBusyAndOver$ = merge(this.isBusy$, this.boardService.getIsGameOver());
  }

  getGameOverStatus(): string {
    return this.boardService.getGameOverStatus();
  }

  onResetClick(): void {
    this.boardService.reset();
  }

  async addGuess(guess: string): Promise<void> {
    if (guess.length === 5 && /^[a-z]+$/.test(guess) && WORDS.includes(guess)) {
      await this.boardService.addGuess(guess);
    }
  }

}
