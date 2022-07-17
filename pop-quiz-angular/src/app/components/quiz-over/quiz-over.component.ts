import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {State} from "../../entities/state";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-quiz-over',
  templateUrl: './quiz-over.component.html',
  styleUrls: ['./quiz-over.component.css']
})
export class QuizOverComponent implements OnInit {

  state$!: Observable<State>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.state$ = this.questionService.getState();
  }

}
