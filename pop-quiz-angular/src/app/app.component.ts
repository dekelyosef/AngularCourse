import { Component } from '@angular/core';
import {Question} from "./entities/question";
import {QUESTIONS} from "./entities/questions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentQuestion: Question;
  currentQuestionIndex: number;
  summary: Question[];
  isQuizOver: boolean;
  score: number;

  constructor() {
    this.currentQuestionIndex = 0;
    this.currentQuestion = QUESTIONS[this.currentQuestionIndex];
    this.summary = [];
    this.isQuizOver = false;
    this.score = 0;
  }

  userSelectAnswer(answer: string) {
    if(!this.isQuizOver) {
      let answerIndex = this.currentQuestion.answers.indexOf(answer);
      this.currentQuestion.userAnswer = answerIndex;
      if (this.currentQuestion.userAnswer === this.currentQuestion.correctAnswer) {
        this.score += 10;
      }
      this.summary.push(this.currentQuestion);
      this.currentQuestionIndex++;
      this.currentQuestion = QUESTIONS[this.currentQuestionIndex];
      this.isQuizOver = !this.currentQuestion;
    }
  }

}
