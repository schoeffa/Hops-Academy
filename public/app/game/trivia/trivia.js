"use strict";
const trivia = {
    templateUrl: "app/game/trivia/trivia.html",
    bindings: {newRound: "&", currentQuestion: "<", showCorrect: "=", showWrong: "="},
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;

        vm.evaluate = (truthiness) => {
            if(truthiness) {
                vm.showCorrect = true;
            } else {
                vm.showWrong = true;
            }
        } 
    }]
}

angular
    .module("HopsAcademy")
    .component("trivia", trivia)