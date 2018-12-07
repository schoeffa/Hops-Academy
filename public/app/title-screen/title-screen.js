"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: ["$location", "TriviaService", function ($location, TriviaService) {
        const vm = this;
        vm.startGame = (intelligence, tolerance) => {
            TriviaService.setUser(intelligence, tolerance);
            $location.path("/game")
        }
        vm.showInstructions = false;

        vm.onShow = () => {
            if (vm.showInstructions === false) {
                vm.showInstructions = true;
            } else {
                vm.showInstructions = false;
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);