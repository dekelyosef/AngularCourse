import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {State} from "../../entities/state";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  state$!: Observable<State>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.state$ = this.questionService.getState();
  }

}
