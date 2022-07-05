import {Question} from "./question";

export interface State {
  readonly currentQuestionIndex: number;
  readonly currentQuestion: Question;
  readonly score: number;
  readonly summary: Question[];
}
