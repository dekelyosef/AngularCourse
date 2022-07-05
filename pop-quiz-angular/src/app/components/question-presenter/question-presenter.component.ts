import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../entities/question";

@Component({
  selector: 'app-question-presenter',
  templateUrl: './question-presenter.component.html',
  styleUrls: ['./question-presenter.component.css']
})
export class QuestionPresenterComponent implements OnInit {
  @Input()
  question: Question;

  @Output()
  answerChosen = new EventEmitter<string>();

  @Input()
  disabled: boolean;

  constructor() {
    this.question = {caption: "", answers: [], correctAnswer: -1, userAnswer: -1};
    this.disabled = false;
  }

  ngOnInit(): void {
  }

  onSelectAnswer(answer: string) {
    this.answerChosen.emit(answer);
  }

}
