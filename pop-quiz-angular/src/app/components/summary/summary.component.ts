import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../entities/question";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input()
  questions: Question[];

  constructor() {
    this.questions = [];
  }

  ngOnInit(): void {
  }

}
