import { Injectable } from '@angular/core';
import {QUESTIONS} from "../entities/questions";
import {State} from "../entities/state";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  state: State;

  constructor() {
    this.state = {
      currentQuestionIndex: 0,
      currentQuestion: QUESTIONS[0],
      score: 0,
      summary: []
    }
  }

  async userSelectAnswer(answer: string): Promise<State> {
    let promise = this.delay(answer);
    this.state.currentQuestion.userAnswer = await promise;
    let newScore = 0;
    if (this.state.currentQuestion.userAnswer === this.state.currentQuestion.correctAnswer) {
      newScore = 10;
    }
    this.state.summary.push(this.state.currentQuestion);
    this.state = {
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      currentQuestion: QUESTIONS[this.state.currentQuestionIndex + 1],
      score: this.state.score + newScore,
      summary: this.state.summary
    }
    return this.state;
  }

  delay(answer: string): Promise<number> {
    let userAnswer = this.state.currentQuestion.answers.indexOf(answer);
    return new Promise((success, failure) => {
      setTimeout(() => success(userAnswer), 3000);
    });
  }

}
