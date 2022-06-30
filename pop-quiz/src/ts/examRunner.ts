import {Exam} from "./exam";
import {Answer} from "./answer";
import {Question} from "./question";

export class ExamRunner {
    private answers: Answer[] = [];

    constructor(private exam: Exam) {}

    currentQuestion(): Question {
        return this.exam.questions[this.answers.length];
    }

    isOver(): boolean {
        if (this.answers.length === 10) {
            return true;
        }
        return false;
    }

    get getExam() {
        return this.exam;
    }

    get getAnswers() {
        return this.answers;
    }

    currentScore(): number {
        let score = 0;
        this.answers.forEach(ans => {
            if(ans.isCorrect) {
                score++;
            }
        })
        return score*10;
    }

    answerNextQuestion(answerIndex: number) {
        let isCorrect = false;
        if (this.currentQuestion().correct == answerIndex) {
            isCorrect = true;
        }
        let answer = {index: answerIndex, isCorrect: isCorrect}
        this.answers.push(answer);
    }

}