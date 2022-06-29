import {Component, Input, OnInit} from '@angular/core';
import {STATUS} from "../../entities/status";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input()
  status: STATUS = {status: "empty"};

  @Input()
  content: string = "";

  @Input()
  color: string = "";

  flag: boolean = true;

  constructor() {}

  ngOnInit(): void {}

}
