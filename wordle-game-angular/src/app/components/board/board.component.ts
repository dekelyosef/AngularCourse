import {Component, OnInit} from '@angular/core';
import {Board} from "../../entities/board";
import {BoardService} from "../../services/board.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board$!: Observable<Board>;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.board$ = this.boardService.getState();
  }

}
