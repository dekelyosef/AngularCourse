import {Exam} from "./exam";
import {Answer} from "./answer";

export class ExamRunner {
    private answers: Answer[];

    constructor(private exam: Exam) {}

    currentQuestion(): number {
        return this.answers.length;
    }

    isOver(): boolean {
        if (this.currentQuestion() === 10) {
            return true;
        }
        return false;
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
        // this.exam.questions[this.currentQuestion()].answers =
    }

}