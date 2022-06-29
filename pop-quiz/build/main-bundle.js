/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/examRunner.ts":
/*!******************************!*\
  !*** ./src/ts/examRunner.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExamRunner = void 0;
var ExamRunner = /** @class */ (function () {
    function ExamRunner(exam) {
        this.exam = exam;
    }
    ExamRunner.prototype.currentQuestion = function () {
        return this.answers.length;
    };
    ExamRunner.prototype.isOver = function () {
        if (this.currentQuestion() === 10) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ExamRunner.prototype, "getAnswers", {
        get: function () {
            return this.answers;
        },
        enumerable: false,
        configurable: true
    });
    ExamRunner.prototype.currentScore = function () {
        var score = 0;
        this.answers.forEach(function (ans) {
            if (ans.isCorrect) {
                score++;
            }
        });
        return score * 10;
    };
    ExamRunner.prototype.answerNextQuestion = function (answerIndex) {
        // this.exam.questions[this.currentQuestion()].answers =
    };
    return ExamRunner;
}());
exports.ExamRunner = ExamRunner;


/***/ }),

/***/ "./src/ts/view.ts":
/*!************************!*\
  !*** ./src/ts/view.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.render = function (examRunner) {
        // refreshes the current state of the various UI elements according to the state of the exam
    };
    return View;
}());
exports.View = View;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var examRunner_1 = __webpack_require__(/*! ./examRunner */ "./src/ts/examRunner.ts");
var view_1 = __webpack_require__(/*! ./view */ "./src/ts/view.ts");
var exam = { questions: [] };
var examRunner = new examRunner_1.ExamRunner(exam);
var view = new view_1.View();
//
// const btn = document.getElementById('button-ok') as HTMLButtonElement;
//
// if (btn) {
//     btn.addEventListener('click', ev => {
//         const inp = document.getElementById('input-name') as HTMLInputElement;
//         const name = inp.value;
//
//         const span = document.getElementById('span-name') as HTMLSpanElement;
//         span.innerText = name;
//     });
// }
//
// const btn2 = document.getElementById('button-equals') as HTMLButtonElement;
// if (btn2) {
//     btn2.addEventListener('click', ev => {
//         const a = document.getElementById('a') as HTMLInputElement;
//         const b = document.getElementById('b') as HTMLInputElement;
//         const span = document.getElementById('span-result') as HTMLSpanElement;
//         const aValue = a.valueAsNumber;
//         const bValue = b.valueAsNumber;
//
//         // const calc = new Calculator();
//         const res = calc.add(aValue, bValue);
//
//         span.innerText = res.toString();
//     });
// }

})();

/******/ })()
;
//# sourceMappingURL=main-bundle.js.map