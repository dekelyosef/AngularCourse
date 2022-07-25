import { Injectable } from '@angular/core';
import {QUESTIONS} from "../entities/questions";
import {State} from "../entities/state";
import {Exam} from "../entities/exam";
import {BehaviorSubject, Observable} from "rxjs";
import {RouterService} from "./router.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  exam: Exam = {
    questions: QUESTIONS
  }

  private state = this.initialState();
  private state$ = new BehaviorSubject<State>(this.state);

  private isBusy = false;
  private isBusy$ = new BehaviorSubject<boolean>(this.isBusy);

  constructor(private routerService: RouterService) {}

  initialState(): State {
    return {
      currentQuestionIndex: 0,
      currentQuestion: this.exam.questions[0],
      score: 0,
      summary: []
    }
  }

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getIsBusy(): Observable<boolean> {
    return this.isBusy$.asObservable();
  }

  async userSelectAnswer(answer: string): Promise<void> {
    await this.delay(3000);
    let userAnswer = this.state.currentQuestion.answers.indexOf(answer);
    this.updateCurrentQuestionWithUserAnswer(userAnswer);
    this.state = await this.getNewState(userAnswer);
    this.state$.next(this.state);
  }

  private delay(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  updateCurrentQuestionWithUserAnswer(userAnswer: number): void {
    this.exam.questions[this.state.currentQuestionIndex] = {
      ...this.exam.questions[this.state.currentQuestionIndex],
      userAnswer: userAnswer
    }
    this.state = { ... this.state, currentQuestion: this.exam.questions[this.state.currentQuestionIndex]}
  }

  async getNewState(userAnswer: number): Promise<State> {
    let newScore = 0;
    if (userAnswer === this.state.currentQuestion.correctAnswer) {
      newScore = 10;
    }
    this.state.summary.push(this.state.currentQuestion);
    return {
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      currentQuestion: this.exam.questions[this.state.currentQuestionIndex + 1],
      score: this.state.score + newScore,
      summary: this.state.summary
    }
  }

  async answerChosen(answer: string) {
    this.isBusy = true;
    this.isBusy$.next(this.isBusy);
    await this.userSelectAnswer(answer);
    this.routerService.setIsQuizOver(!this.state.currentQuestion);
    this.isBusy = false;
    this.isBusy$.next(this.isBusy);
  }

}
