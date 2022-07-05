import { Component } from '@angular/core';
import {Question} from "./entities/question";
import {QuestionService} from "./services/question.service";
import {State} from "./entities/state";
import {QUESTIONS} from "./entities/questions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state: State;
  isQuizOver: boolean;
  isBusy: boolean;

  constructor(private questionService: QuestionService) {
    this.state = this.questionService.state;
    this.isBusy = false;
    this.isQuizOver = false;
  }

  async userSelectAnswer(answer: string) {
    this.isBusy = true;
    if(!this.isQuizOver) {
      this.state = await this.questionService.userSelectAnswer(answer);
      // this.summary = this.questionService.summary;
      // this.score = this.questionService.score;
      this.isQuizOver = !this.state.currentQuestion;
    }
    this.isBusy = false;
  }

}
