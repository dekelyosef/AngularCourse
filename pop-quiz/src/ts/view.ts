import {ExamRunner} from "./examRunner";
import {EventEmitter} from "events";

export class View extends EventEmitter {
    private readonly answerButtons: HTMLDivElement;
    private readonly currentQuestion: HTMLDivElement;
    private readonly quizSummary: HTMLDivElement;

    constructor() {
        super();
        this.answerButtons = document.getElementById('buttons-answers') as HTMLDivElement;
        this.currentQuestion = document.getElementById('question') as HTMLDivElement;
        this.quizSummary = document.getElementById("quiz-summary") as HTMLDivElement;
    }

    render(examRunner: ExamRunner) {
        while (this.answerButtons.firstChild) {
            this.answerButtons.removeChild(this.answerButtons.firstChild);
        }
        if (examRunner.isOver()) {
            this.answerButtons.style.display = "none";
            this.currentQuestion.style.display = "none";
            this.quizOver(examRunner);
        } else {
            let currentQuestion = examRunner.currentQuestion();
            this.currentQuestion.innerText = currentQuestion.caption;
            currentQuestion.answers.forEach(answer => {
                const ansButton = document.createElement('button');
                ansButton.innerText = answer;
                ansButton.className = "answer";
                ansButton.addEventListener('click', () => {
                    this.emit('onChoose', currentQuestion.answers.indexOf(answer));
                })
                this.answerButtons.appendChild(ansButton);
            })
        }
    }

    quizOver(examRunner: ExamRunner) {
        this.quizSummary.style.display = "inherit";
        this.quizSummary.innerText = "EXAM IS OVER! YOUR FINAL SCORE " + examRunner.currentScore();
        examRunner.getExam.questions.forEach(quest => {
            const question = document.createElement('div');
            question.innerText = quest.caption;
            question.className = "summary-header";
            const providedAns = document.createElement('button');
            providedAns.className = "answer";
            let answer = examRunner.getAnswers.at(examRunner.getExam.questions.indexOf(quest));
            if (answer !== undefined) {
                providedAns.innerText = quest.answers[answer.index];
                if (answer.isCorrect) {
                    providedAns.classList.add("correct");
                } else {
                    providedAns.classList.add("wrong");
                }
            }
            const correctAns = document.createElement('button');
            correctAns.className = "answer correct";
            correctAns.innerText = quest.answers[quest.correct];

            this.quizSummary.appendChild(question);
            this.quizSummary.appendChild(providedAns);
            this.quizSummary.appendChild(correctAns);
            }
        )
    }
}