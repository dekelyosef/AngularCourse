import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../entities/question";

@Component({
  selector: 'app-quiz-over',
  templateUrl: './quiz-over.component.html',
  styleUrls: ['./quiz-over.component.css']
})
export class QuizOverComponent implements OnInit {
  @Input()
  questions: Question[];

  @Input()
  score: number = 0;

  constructor() {
    this.questions = [];
  }

  ngOnInit(): void {
  }

}
