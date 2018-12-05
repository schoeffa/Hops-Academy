"use strict";
const trivia = {
    templateUrl: "app/game/trivia/trivia.html",
    bindings: {newRound: "&", currentQuestion: "<", showCorrect: "=", showWrong: "=", showPick: "<", roundNum: "<"},
    controller: ["TriviaService", "$location", function (TriviaService, $location) {
        const vm = this;
        vm.showWin = false
        vm.goHome = () => {
            $location.path("/")
        }
        vm.evaluate = (truthiness) => {
            if(truthiness && vm.roundNum === 5) {
                vm.showWin = true
                console.log("YOU WON")
            } else if(truthiness) {
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