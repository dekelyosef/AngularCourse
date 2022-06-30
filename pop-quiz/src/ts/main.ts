import {ExamRunner} from "./examRunner";
import {View} from "./view";
import {QUESTIONS} from "./data";

const exam = {questions: QUESTIONS};
const examRunner = new ExamRunner(exam);
const view = new View();

view.render(examRunner);

view.on('onChoose', (answer: number) => {
    examRunner.answerNextQuestion(answer);
    view.render(examRunner);
})