import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {QuestionService} from "../../services/question.service";
import {State} from "../../entities/state";

@Component({
  selector: 'app-question-presenter',
  templateUrl: './question-presenter.component.html',
  styleUrls: ['./question-presenter.component.css']
})
export class QuestionPresenterComponent implements OnInit {

  state$!: Observable<State>;
  disabled$!: Observable<boolean>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.state$ = this.questionService.getState();
    this.disabled$ = this.questionService.getIsBusy();
  }

  onSelectAnswer(answer: string) {
    this.questionService.answerChosen(answer).then();
  }
}
