import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../entities/board";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input()
  board: Board;

  constructor(private gameService: GameService) {
    this.board = this.gameService.getState();
  }

  ngOnInit(): void {}

}
