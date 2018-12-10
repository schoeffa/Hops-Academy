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
            } else if(truthiness) {
                vm.showCorrect = true;
                vm.newRound();
            } else {
                vm.showWrong = true;
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