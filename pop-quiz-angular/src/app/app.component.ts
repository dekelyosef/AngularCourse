import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./services/question.service";
import {State} from "./entities/state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  state$!: Observable<State>;
  isBusy$!: Observable<boolean>;
  isQuizOver$!: Observable<boolean>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.state$ = this.questionService.getState();
    this.isBusy$ = this.questionService.getIsBusy();
    this.isQuizOver$ = this.questionService.getIsQuizOver();
  }

}
