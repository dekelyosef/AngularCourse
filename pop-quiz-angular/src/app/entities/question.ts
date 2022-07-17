export interface Question {
  readonly caption: string;
  readonly answers: string[];
  readonly correctAnswer: number;
  readonly userAnswer: number;
}
