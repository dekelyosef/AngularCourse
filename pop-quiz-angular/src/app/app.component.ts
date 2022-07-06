import { Component } from '@angular/core';
import {QuestionService} from "./services/question.service";
import {State} from "./entities/state";

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
      this.isQuizOver = !this.state.currentQuestion;
    }
    this.isBusy = false;
  }

}
