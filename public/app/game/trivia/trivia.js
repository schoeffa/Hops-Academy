"use strict";
const trivia = {
    templateUrl: "app/game/trivia/trivia.html",
    bindings: { newRound: "&", currentQuestion: "<", showCorrect: "=", showWrong: "=", showPick: "<", roundNum: "<" },
    controller: ["TriviaService", "$location", function (TriviaService, $location) {
        const vm = this;
        vm.showWin = false
        vm.goHome = () => {
            $location.path("/")
        }
        vm.evaluate = (truthiness) => {
            if (truthiness && vm.roundNum === 5) {
                vm.showWin = true
            } else if (truthiness) {
                vm.showCorrect = true;
                vm.newRound();
            } else {
                vm.showWrong = true;
                console.log(vm.currentQuestion)
                for (let i = 0; i < vm.currentQuestion.answers.length; i++) {
                    if(vm.currentQuestion.answers[i].eval === true) {
                        vm.storedCorrect = vm.currentQuestion.answers[i].answer
                    }
                }
            }
        }
        vm.newGame = () => {
            TriviaService.newGame()
        }


    }]
}

angular
    .module("HopsAcademy")
    .component("trivia", trivia)