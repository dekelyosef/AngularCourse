import {Question} from "./question";

export const QUESTIONS: Question[] = [
  {
    caption: "AngularJS is a",
    answers: ["Java framework", "JavaScript framework", "HTML framework", "SQL framework"],
    correctAnswer: 1,
    userAnswer: -1
  },
  {
    caption: "Among the following, on which architectural pattern is AngularJS based?",
    answers: ["Decorator pattern", "Observer pattern", "MVVM architecture pattern", "MVC architecture pattern"],
    correctAnswer: 2,
    userAnswer: -1
  },
  {
    caption: "State whether true or false:  AngularJS provides reusable components",
    answers: ["True", "False"],
    correctAnswer: 0,
    userAnswer: -1
  },
  {
    caption: "Choose the correct syntax for writing AngularJS expression",
    answers: ["[expression]", "{expression}", "{{{expression}}}", "{{expression}}"],
    correctAnswer: 3,
    userAnswer: -1  },
  {
    caption: "Choose the advantage of Angular JS among the following",
    answers: ["it provides reusable components",
      "it uses dependency injection and makes use of separation of concerns",
      "it is unit-testable", "all of the above"],
    correctAnswer: 3,
    userAnswer: -1
  },
  {
    caption: "Which of the following components is the one which can be injected as a dependency in Angular JS?",
    answers: ["Factory", "Constant", "Application module", "Value"],
    correctAnswer: 2,
    userAnswer: -1
  },
  {
    caption: "Among the following which can be used to write AngularJS directives",
    answers: ["Attribute", "Class name", "Tag", "all of the above"],
    correctAnswer: 3,
    userAnswer: -1
  },
  {
    caption: "State whether true or false: $https Services used to make an Ajax call to the server.",
    answers: ["True", "False"],
    correctAnswer: 0,
    userAnswer: -1
  },
  {
    caption: "Angular CLI stands for",
    answers: ["Angular command-line interceptor", "Angular command-line",
      "Angular command-line interface", "Angular command-line user interfaces"],
    correctAnswer: 2,
    userAnswer: -1
  },
  {
    caption: "What is the functionality of the @input decorator",
    answers: ["share data from child component to parent", "use a service", "use event binding",
      "share data from parent component to child"],
    correctAnswer: 3,
    userAnswer: -1
  }
]
