import {Component, Input, OnInit} from '@angular/core';
import {Cell} from "../../entities/cell";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input()
  cell: Cell = {content: '', status: "empty", color: ''}

  constructor() {}

  ngOnInit(): void {}
}
